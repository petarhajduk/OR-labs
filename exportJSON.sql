.output pitajMgmt.json
.mode json
SELECT 
    m.manager_id, 
    m.username, 
    m.email, 
    m.password_hash,
    JSON_GROUP_ARRAY(
        JSON_OBJECT(
            'post_id', p.post_id,
            'thread_id', p.thread_id,
            'subjectt', p.subjectt,
            'poruka', p.poruka,
            'manager_vidio', p.manager_vidio,
            'from_manager', p.from_manager,
            'time_created', p.time_created,
            'time_manager_saw', p.time_manager_saw,
            'closed', p.closed
        )
    ) AS posts
FROM manager m
LEFT JOIN post p ON p.za_koga_id = m.manager_id
GROUP BY m.manager_id;
