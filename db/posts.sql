create table posts
(
	id varchar(36) not null
		constraint posts_pkey
			primary key,
	username varchar(32) not null,
	format integer,
	content text,
	location text,
	tags varchar(16),
	filepath varchar(64),
	creationtime timestamp default now()
)
;

create unique index posts_id_uindex
	on posts (id)
;

