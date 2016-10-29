'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');

gulp.task('db_create_user_accounts_table', function() {
  var sqlString = "create table user_accounts (" +
  "id int not null auto_increment, " +
  "first_name varchar(255) not null," +
  "email varchar(255) not null unique, " +
  "password_hash varchar(61) not null, " +
  "primary key (id) " +
  ");";
  //callback(response)
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
  //db.raw(query).then(callback)
});

gulp.task('db_create_locations_table', function () {
  var sqlString = "create table locations (" +
  "id int not null auto_increment," +
  "locations varchar(255) not null," +
  "primary key (id)" +
");";
function cb(res) {
  console.log(res);
}
db.raw(sqlString).then(cb);
});


gulp.task('db_create_images_table', function () {
  var sqlString = "create table images (" +
  "id int not null auto_increment," +
	"CONSTRAINT locations_fK varchar(255) not null," +
  "FOREIGN KEY(locations)," +
  "created_at DATETIME," +
	"image BLOB not null," +
	"description varchar(255)," +
  "path varchar(255)," +
	"CONSTRAINT id_fK uploaded_by varchar (255) not null," +
  "FOREIGN KEY (id)," +
  "primary key (id)"
  ");";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
  });








// create table images (
//   id int not null auto_increment;
// 	FOREIGN KEY fk_locations(locations) varchar(255) not null,
// 	created_at DATETIME,
// 	image BLOB,
// 	description varchar(255),
//   -- path varchar(255), << location of the image, string like this /files/imagename.png
// 	-- uploaded_by ..., << make foreign key
//   primary key (id)
// );



// section to DROP SQL tables!
gulp.task('db_drop_user_accounts_table', function() {
    var sqlString = "drop table user_accounts;";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});

gulp.task('db_create_locations_table', function(){
    var sqlString = "drop table news_feed;";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});

gulp.task('db_drop_images', function(){
    var sqlString = "drop table cats;";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});




// nodemon it up!
gulp.task('Nodemon', restartServer);

function restartServer() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
  });
};

gulp.task('default', ['Nodemon']);
