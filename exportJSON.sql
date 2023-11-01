.output pitajMgmt.json
.mode json
SELECT p.post_id, p.thread_id, p.subjectt, p.poruka, p.manager_vidio, p.from_manager,
    p.time_created, p.time_manager_saw, p.closed,
    JSON_OBJECT(
        'username', m.username,
        'email', m.email,
        'password_hash', m.password_hash
    ) AS manager_info
FROM post p
JOIN manager m ON p.za_koga_id = m.manager_id;