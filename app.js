var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var ctrl = require('./controllers/index');
var users = require('./controllers/users');
var fs = require('fs');
var cleanCSS = require('gulp-clean-css');

var app = express();

//render image
// var form = "<!DOCTYPE HTML><html><body>" +
// "<form method='post' enctype='multipart/form-data' action='/home'>"
//   "<input type='file' id='upload' name='upload'>"
//   "<input type='submit' value='Upload' name='Submit'>"
//   "</body></html>";


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret:'thisisasecret',
  resave: true,
  saveUninitialized: true
}));

// uncomment after placing your favicon in /public


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public'))); // the 'public'folder is served as is.
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


app.use('/', require('./controllers/index'));
app.use('/users', require('./controllers/users'));
app.use('/', require('./controllers/pages'));
app.use('/images', require('./controllers/images'));
// app.use('/form', require('.controllers/users'))
// app.use('/db', require('./controllers/db'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
