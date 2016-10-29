'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');

// gulp.task('db_create_user_table', function() {
//   var sqlString = "create table user_accounts (" +
//   "id int not null auto_increment, " +
//   "email varchar(255) not null, " +
//   "password_hash varchar(61) not null, " +
//   "primary key (id) " +
//   ");";
//   //callback(response)
//   function cb(res) {
//     console.log(res);
//   }
//   db.raw(sqlString).then(cb);
//   //db.raw(query).then(callback)
// });
// // section to drop SQL tables!
// gulp.task('create_table_news_feed', function() {
//   var sqlString = "create table news_feed (" +
//   "id int not null auto_increment," +
//   "timestamp DATETIME, " +
//   "comment text, " +
//   "primary key (id)" +
//   ");";
//   //callback(response)
//   function cb(res) {
//     console.log(res);
//   }
//   db.raw(sqlString).then(cb);
//   //db.raw(query).then(callback)
// });
//
// // gulp create_table_cats
// gulp.task('create_table_cats', function() {
//   var sqlString = "create table cats (" +
//   "id int not null auto_increment," +
//   "timestamp DATETIME," +
//   "comment text," +
//   "primary key (id)" +
//   ");";
//   //callback(response)
//   function cb(res) {
//     console.log(res);
//   }
//   db.raw(sqlString).then(cb);
//   //db.raw(query).then(callback)
// });
//
//
// // section to DROP SQL tables!
// gulp.task('db_drop_user_table', function() {
//     var sqlString = "drop table user_accounts;";
//     //callback(response)
//     function cb(res) {
//         console.log(res);
//     }
//     db.raw(sqlString).then(cb);
//     //db.raw(query).then(callback)
// });
//
// gulp.task('db_drop_news_feed', function(){
//     var sqlString = "drop table news_feed;";
//     //callback(response)
//     function cb(res) {
//         console.log(res);
//     }
//     db.raw(sqlString).then(cb);
//     //db.raw(query).then(callback)
// });
//
// gulp.task('db_drop_cats', function(){
//     var sqlString = "drop table cats;";
//     //callback(response)
//     function cb(res) {
//         console.log(res);
//     }
//     db.raw(sqlString).then(cb);
//     //db.raw(query).then(callback)
// });




// nodemon it up!
gulp.task('Nodemon', restartServer);

function restartServer() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
  });
};

gulp.task('default', ['Nodemon']);
