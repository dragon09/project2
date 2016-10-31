var express = require('express');
var ctrl = express.Router();
var express = require('express');
// var userCtrl = express.Router();
var usersForm = require('../models/users');
var bcrypt = require('bcryptjs');
var multer = require('multer');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Of Thrones Destinations' });
});

ctrl.get('/home', renderHome)
ctrl.post('/login/new_user', attemptToLogin)
ctrl.get('/form', renderForm);
ctrl.get('login', renderLogin);
ctrl.post('/thisIsMyPostRoute', function(req, res, next) {
console.log(req.body, "this is req.body")
res.send('Thank you for logging in')
});

ctrl.get('/about', function(req, res){
  res.render('about', {
    title: 'About page'
  });
});

ctrl.get('/locations', function(req, res){
  res.render('locations', {
    title: 'Info about locations'
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
  console.log(req.session)
  usersModel.where('email', req.session.theResultsFromModelInsertion).fetch().then(
    function (result) {
      console.log(result)
      res.json({result});
    });
    res.render('home', {})
};

function renderForm(req, res, next) {
  res.render('form', {});
};

function renderLogin(req, res, next) {
  res.render('login', {});

};

function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);


var model = new usersModel(req.body).save().then(function (data) {
  res.render('home', data.attributes);
});
};

function attemptToRegister(req, res, next) {

  console.log(req.session);
  var password = req.body.password;
  var hashedPassword = createPasswordHash(password);
  var account = new usersModel({
    email: req.body.name,
    password_hash: hashedPassword
  }).save().then(function(result) {
    eq.session.theResultsFromModelInsertion = result.attributes.email;
    console.log(result.attributes.email);
    res.redirect('/home')

  });
  };

  function createPasswordHash (password) {
  var salt = 10; // salt factor of 10
  var hash = bcrypt.hashSync(password, salt);
  return hash;
  };
  function comparePasswordHashes (input, db) {
    return bcrypt.compareSync(input, db);
  };

  function attemptToLogin(req, res, next) {
    var password = req.body.password;
    usersModel.where('email', req.body.email).fetch().then(
      function (result) {
        var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
        res.json({'is_logged_in': attempt})
      });
    };

module.exports = ctrl;
