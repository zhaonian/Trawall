DROP DATABASE IF EXISTS trawall;
CREATE DATABASE trawall;

DROP USER IF EXISTS luan;
CREATE USER luan WITH PASSWORD 'postgresql-luan';
GRANT ALL PRIVILEGES ON DATABASE trawall TO luan;

\connect trawall

CREATE TABLE trawall_users
(
	id              varchar(36),
	email           VARCHAR(64) UNIQUE NOT NULL,
	hash            VARCHAR(128) NOT NULL,
	username        VARCHAR(32),
	profilepic      VARCHAR(128),
	recoverytoken   VARCHAR(128),
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX trawall_users_id_uindex ON trawall_users (email);

CREATE TABLE posts
(
    postid          varchar(36),
	userid          varchar(36) NOT NULL,
	format          INTEGER NOT NULL,
	content         TEXT,
	location        TEXT,
	tags            VARCHAR(16),
	filepath        VARCHAR(64),
	creationtime    TIMESTAMP default now(),
	PRIMARY KEY (userid, postid),
	FOREIGN KEY (userid) REFERENCES trawall_users (id) ON DELETE CASCADE
);

CREATE INDEX posts_creationtime_index ON posts (creationtime);

CREATE TABLE likes
(
	userid          varchar(36) NOT NULL,
	postid          varchar(36) NOT NULL,
	PRIMARY KEY (userid, postid),
	FOREIGN KEY (userid, postid) REFERENCES posts (userid, postid) ON DELETE CASCADE
);


CREATE TABLE chats
(
    sender_id       varchar(36) NOT NULL,
    receiver_id     varchar(36) NOT NULL,
    format          INTEGER NOT NULL,
	content         TEXT,
	filepath        VARCHAR(64),
	creationtime    TIMESTAMP default now(),
    unread          BOOLEAN NOT NULL,
    PRIMARY KEY (sender_id, receiver_id, creationtime),
    FOREIGN KEY (sender_id) REFERENCES trawall_users (id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES trawall_users (id) ON DELETE CASCADE
);

CREATE INDEX chats_creationtime_index ON chats (creationtime);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO luan;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO luan;

