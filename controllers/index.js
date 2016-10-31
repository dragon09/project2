var express = require('express');
var ctrl = express.Router();
var express = require('express');
// var userCtrl = express.Router();
var User = require('../models/User');
var multer = require('multer');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Of Thrones Destinations' });
});

ctrl.get('/home', renderHome)

ctrl.post('/thisIsMyPostRoute', function(req, res, next) {
console.log(req.body, "this is req.body")
res.send('Thank you for uploading an image.')
});

ctrl.get('/about', function(req, res){
  res.render('about', {
    title: 'About page'
  });
});

ctrl.get('/addPost', function(req, res){
  res.render('addPost', {
    title: 'Post a comment'
  });
});

ctrl.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact Us page'
  });
});
//NEED TO START SESSION
// ctrl.post('/thisIsMyPostRoute', attemptToRegister, insertIntoUserAccountsTable);

//multer
ctrl.post('/home', multer({destination: './uploads'}).single('upload'), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.status(204).end();
});


// ctrl.get('/login', function (req, res, next) {
// });
// ctrl.get('/', function(req, res, next) {
//   res.render('users', {})
// });
// ctrl.post('/register', attemptToRegister);
// ctrl.post('/login', attemptToLogin);

function renderHome(req, res, next) {
  console.log(req.session);

  if(req.session.theResultsFromModelInsertion){

    User.where('email', req.session.theResultsFromModelInsertion).fetch().then(
      function (result) {
        console.log(result)
        // res.json({result});
        res.render('home', result.attributes)
      });
  } else {
    res.render('home', {first_name:'Anonymous', email:''});
  }
};




function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);


var model = new User(req.body).save().then(function (data) {
  res.render('home', data.attributes);
});
};




ctrl.post('/uploadimage', multer({ dest: './uploads/'}).single('img'), function(req, res){
  res.redirect('/home')
})



module.exports = ctrl;
