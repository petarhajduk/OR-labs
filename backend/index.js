const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database('../pitajMgmt.db');

app.use(cors({ origin: '*' }));
app.use(express.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'p3IYWVqzPgDNwpgZFtFKKIWrkA9dX0H-pvmdCiHey__qnldkIJAgW6jD04QFcAcY',
    baseURL: 'http://localhost:3000',
    clientID: 'CYHkXEWZz5Ssx0mk572uX6Cxh7AFvafr',
    issuerBaseURL: 'https://dev-mi8srd6syolya54r.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log('root route reached');

    const filePath = '../loginInfo.txt';
    const filePath1 = '../userInfo.txt';

    if (req.oidc.isAuthenticated()) {
        fs.writeFile(filePath, '1', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Authentication successful. Wrote "1" to the file.');
            }
        });

        fs.writeFile(filePath1, JSON.stringify(req.oidc.user), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Authentication successful. Wrote user info to the file.');
            }
        });

        res.redirect('http://localhost:5500/frontend/index.html');
    } else {
        fs.writeFile(filePath, '0', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Authentication failed. Wrote "0" to the file.');
            }
        });

        fs.writeFile(filePath1, '', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Authentication successful. Wrote "1" to the file.');
            }
        });

        res.redirect('http://localhost:5500/frontend/index.html');
    }
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/authcallback', (req, res) => {
    res.cookie('authToken', 'loginSuccessful', { httpOnly: true });
    console.log('AuthCallback route reached');
    if (req.oidc.isAuthenticated()) {
        res.cookie('authToken', 'loginSuccessful', { httpOnly: true });
        res.json({ success: true, message: 'Authentication successful' });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
});

app.get('/api/managers', (req, res) => {
    const { columnName, value } = req.query;

    const isManagerColumn = columnName === 'manager_id' || columnName === 'username' || columnName === 'email';

    if (columnName && value) {
        let query;

        if (isManagerColumn) {
            query = `
                SELECT manager.*, post.*
                FROM manager
                JOIN post ON manager.manager_id = post.za_koga_id
                WHERE manager.${columnName} = ?;
            `;
        } else {
            query = `
                SELECT manager.*, post.*
                FROM manager
                JOIN post ON manager.manager_id = post.za_koga_id
                WHERE post.${columnName} = ?;
            `;
        }

        db.all(query, [value], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json(rows);
            }
        });
    } else {
        const query = 'SELECT * FROM manager JOIN post ON manager.manager_id = post.za_koga_id';
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json(rows);
            }
        });
    }
});

app.get('/api/managers/:managerId', (req, res) => {
    console.log('kita')
    const managerId = req.params.managerId;

    const query = `
        SELECT manager.*, post.*
        FROM manager
        LEFT JOIN post ON manager.manager_id = post.za_koga_id
        WHERE manager.manager_id = ?;
    `;

    db.all(query, [managerId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(rows)
            if (rows && rows.length > 0) {
                res.json(rows);
            } else {
                res.status(400).send('Manager not found');
            }
        }
    });
});

app.get('/api/posts', (req, res) => {
    const query = `
        SELECT post.*
        FROM post;
    `;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/posts/:postId', (req, res) => {
    const postId = req.params.postId;

    const query = `
        SELECT post.*
        FROM post
        WHERE post.post_id = ?;
    `;

    db.get(query, [postId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (row) {
                res.json(row);
            } else {
                res.status(404).send('Post not found');
            }
        }
    });
});

app.get('/api/thread/:threadId', (req, res) => {
    const threadId = req.params.threadId;

    const query = `
        SELECT post.*
        FROM post
        WHERE post.thread_id = ?;
    `;

    db.all(query, [threadId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (rows && rows.length > 0) {
                res.json(rows);
            } else {
                res.status(404).send('Thread not found');
            }
        }
    });
});

app.post('/api/posts', (req, res) => {
    const { thread_id, za_koga_id, subjectt, poruka, from_manager } = req.body;
    const manager_vidio = false;
    const time_created = new Date().toISOString();
    const time_manager_saw = from_manager ? new Date().toISOString() : null;
    const closed = false;

    const query = `
        INSERT INTO post (thread_id, za_koga_id, subjectt, poruka, manager_vidio, from_manager, time_created, time_manager_saw, closed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.run(query, [thread_id, za_koga_id, subjectt, poruka, manager_vidio, from_manager, time_created, time_manager_saw, closed], function (err) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const postId = this.lastID;
            res.status(201).json({ message: 'Post added successfully', postId });
        }
    });
});

app.put('/api/managers/:managerId', async (req, res) => {
    const managerId = req.params.managerId;
    const { email, password } = req.body;

    try {
        let hashedPassword = null;

        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const updateQuery = `
            UPDATE manager
            SET ${email ? 'email = ?,' : ''} ${password ? 'password_hash = ?' : ''} 
            WHERE manager_id = ?;
        `;

        const params = [];
        if (email) params.push(email);
        if (password) params.push(hashedPassword);
        params.push(managerId);

        const checkEmailQuery = 'SELECT manager_id FROM manager WHERE email = ? AND manager_id != ?';
        db.get(checkEmailQuery, [email, managerId], (emailCheckErr, existingManager) => {
            if (emailCheckErr) {
                console.error(emailCheckErr);
                res.status(500).send('Internal Server Error');
            } else if (existingManager) {
                res.status(400).send('Email is already in use by another manager');
            } else {
                const updateQuery = 'UPDATE manager SET email = ?, password_hash = ? WHERE manager_id = ?';
                db.run(updateQuery, [email, password, managerId], function (updateErr) {
                    if (updateErr) {
                        console.error(updateErr);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.status(200).send('Manager updated successfully');
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/thread/:threadId', (req, res) => {
    const threadId = req.params.threadId;

    const deleteQuery = `
        DELETE FROM post
        WHERE thread_id = ?;
    `;

    const selectQuery = `
        SELECT * FROM post
        WHERE thread_id = ?;
    `;

    // Check if the thread exists before attempting to delete posts
    db.all(selectQuery, [threadId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (rows && rows.length > 0) {
                db.run(deleteQuery, [threadId], function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.json({ message: 'Posts in the thread deleted successfully' });
                    }
                });
            } else {
                res.status(404).send('Thread not found');
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});