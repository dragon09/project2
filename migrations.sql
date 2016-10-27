create database cats_fansite;
use cats_fansite;
create table user_accounts (
	id int not null auto_increment,
	email varchar(255) not null,
	password_hash varchar(61) not null,
	primary key (id)
	);

-- then insert 1 row
-- select * from table to verify it works
-- do this for all 3 tables on the whiteboard

create table cats (
	id int not null auto_increment,
	name varchar(50) not null,
	photo_url varchar(255),
	comment varchar(255),
	primary key (id)
	);

-- alter table

create table news_feed (
	id int not null auto_increment,
	timestamp DATETIME,
	comment text,
	primary key (id)
	);
	);
