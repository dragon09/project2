create database got_database;
  use got_database;

  create table users (
    id int not null auto_increment,
    first_name varchar(25) not null,
    email varchar(255) not null unique,
    password_hash varchar(61) not null,
    primary key (id)
  );

  create table locations (
    id int not null auto_increment,
    locations varchar(255) not null,
    city varchar(255),
    country varchar(255),
    primary key (id)
);

create table images (
  id int not null auto_increment;
	CONSTRAINT locations_fK varchar(255) not null,
  FOREIGN KEY(locations),
  created_at DATETIME,
	image BLOB not null,
	description varchar(255),
  path varchar(255),
	CONSTRAINT id_fK uploaded_by varchar (255) not null,
  FOREIGN KEY (id),
  primary key (id)
);

create user 'l33tdba'@'localhost' identified by 'l33tdba';
GRANT ALL PRIVILEGES ON got_database.* to 'l33tdba'@'localhost';





















-- create database cats_fansite;
-- use cats_fansite;
-- create table user_accounts (
-- 	id int not null auto_increment,
-- 	email varchar(255) not null,
-- 	password_hash varchar(61) not null,
-- 	primary key (id)
-- 	);

-- then insert 1 row
-- select * from table to verify it works
-- do this for all 3 tables on the whiteboard

-- create table cats (
-- 	id int not null auto_increment,
-- 	name varchar(50) not null,
-- 	photo_url varchar(255),
-- 	comment varchar(255),
-- 	primary key (id)
-- 	);

-- alter table

-- create table news_feed (
-- 	id int not null auto_increment,
-- 	timestamp DATETIME,
-- 	comment text,
-- 	primary key (id)
-- 	);
-- 	);
