create table likes
(
	userid varchar(36) not null,
	postid varchar(36) not null
		constraint likes_pkey
			primary key
)
;

