create database got_database;
  use got_database;
  create table users (
    id int not null auto_increment,
    first_name varchar(25) not null,
    email varchar(255) not null,
    password_hash varchar(61) not null,
    primary key (id)
  );

  create table locations (
    id int not null auto_increment;
    locations varchar(255) not null,
    primary key (id)
);

create table images (
  id int not null auto_increment;
	locations varchar(255) not null, << make foreign key
  path varchar(255), << location of the image, string like this /files/imagename.png
  description varchar(255),
  created_at DATETIME,
	uploaded_by ..., << make foreign key
  primary key (id)
);



















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
