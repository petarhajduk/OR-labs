const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database('../pitajMgmt.db');

app.use(cors({ origin: '*' }));
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});