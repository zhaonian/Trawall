create table trawall_users
(
	id varchar(36) not null
		constraint trawall_users_pkey
			primary key,
	email varchar(64) not null,
	hash varchar(128) not null,
	username varchar(32),
	profilepic varchar(128)
)
;

create unique index trawall_users_id_uindex
	on trawall_users (id)
;

create table posts
(
	id varchar(36) not null
		constraint posts_pkey
			primary key,
	username varchar(32) not null,
	format integer,
	content text,
	location text,
	tags varchar(16)
)
;

create unique index posts_id_uindex
	on posts (id)
;

