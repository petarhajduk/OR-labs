.headers on
.mode csv
.output pitajMgmt.csv
SELECT p.post_id, p.thread_id, p.subjectt, p.poruka, p.manager_vidio, p.from_manager,
       p.time_created, p.time_manager_saw, p.closed,
       m.username, m.email, m.password_hash
FROM post p
JOIN manager m ON p.za_koga_id = m.manager_id;
.output stdout