create table if not exists manager 
(manager_id integer primary key AUTOINCREMENT, 
username varchar(50) unique not null, 
email varchar(50) unique not null, 
password_hash varchar(256) not null);

create table if not exists post
(post_id integer primary key autoincrement,
thread_id int unsigned not null,
za_koga_id int unsigned not null,
subjectt varchar(255),
poruka text,
manager_vidio boolean default false,
from_manager boolean not null,
time_created datetime,
time_manager_saw datetime,
closed boolean, 
foreign key (za_koga_id) references manager(manager_id) on delete cascade);

insert into manager (username, email, password_hash) values
('menadžer1', 'menadžer1@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer2', 'menadžer2@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer3', 'menadžer3@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer4', 'menadžer4@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer5', 'menadžer5@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer6', 'menadžer6@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer7', 'menadžer7@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer8', 'menadžer8@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer9', 'menadžer9@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f'),
('menadžer10', 'menadžer10@gmail.com', 'jdn934hf937bo3ubf934fvb93b4f');


insert into post (thread_id, za_koga_id, subjectt, poruka, 
manager_vidio, from_manager, time_created, time_manager_saw, closed) values
(1, 1, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:00:00', null, 0),
(1, 1, 'tema1', 'poruka2', 1, 1, '2023-11-01 12:05:00', '2023-11-01 12:06:00', 0),
(2, 2, 'tema2', 'poruka1', 1, 0, '2023-11-01 13:00:00', null, 1),
(2, 2, 'tema2', 'poruka2', 1, 1, '2023-11-01 13:05:00', '2023-11-01 13:05:00', 1),
(3, 3, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:10:00', null, 0),
(3, 3, 'tema1', 'poruka2', 1, 1, '2023-11-01 12:15:00', '2023-11-01 12:15:00', 0),
(4, 4, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:20:00', null, 0),
(4, 4, 'tema2', 'poruka2', 1, 1, '2023-11-01 13:15:00', '2023-11-01 13:15:00', 1),
(5, 5, 'tema2', 'poruka1', 1, 1, '2023-11-01 13:15:00', null, 1),
(5, 5, 'tema2', 'poruka2', 1, 0, '2023-11-01 13:20:00', '2023-11-01 13:15:00', 1),
(6, 6, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:00:00', null, 0),
(6, 6, 'tema1', 'poruka2', 1, 1, '2023-11-01 12:05:00', '2023-11-01 12:06:00', 0),
(7, 7, 'tema2', 'poruka1', 1, 0, '2023-11-01 13:00:00', null, 1),
(7, 7, 'tema2', 'poruka2', 1, 1, '2023-11-01 13:05:00', '2023-11-01 13:05:00', 1),
(8, 8, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:10:00', null, 0),
(8, 8, 'tema1', 'poruka2', 1, 1, '2023-11-01 12:15:00', '2023-11-01 12:15:00', 0),
(9, 9, 'tema1', 'poruka1', 0, 0, '2023-11-01 12:20:00', null, 0),
(9, 9, 'tema2', 'poruka2', 1, 1, '2023-11-01 13:15:00', '2023-11-01 13:15:00', 1),
(10, 10, 'tema2', 'poruka1', 1, 1, '2023-11-01 13:15:00', null, 1),
(10, 10, 'tema2', 'poruka2', 1, 0, '2023-11-01 13:20:00', '2023-11-01 13:15:00', 1);