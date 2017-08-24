create table trawall_users
(
	id varchar(36) not null
		constraint trawall_users_pkey
			primary key,
	email varchar(64) not null,
	hash varchar(128) not null,
	username varchar(32),
	profilepic varchar(128),
	recoverytoken varchar(128)
)
;

create unique index trawall_users_id_uindex
	on trawall_users (id)
;

