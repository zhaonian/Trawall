CREATE TABLE likes
(
    userid VARCHAR(36) NOT NULL,
    postid VARCHAR(36) PRIMARY KEY NOT NULL
);
CREATE TABLE posts
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(32) NOT NULL,
    format INTEGER,
    content TEXT,
    location TEXT,
    tags VARCHAR(16)
);
CREATE UNIQUE INDEX posts_id_uindex ON posts (id);
CREATE TABLE trawall_users
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(64) NOT NULL,
    hash VARCHAR(128) NOT NULL,
    username VARCHAR(32),
    profilepic VARCHAR(128),
    recoverytoken VARCHAR(128)
);
CREATE UNIQUE INDEX trawall_users_id_uindex ON trawall_users (id);