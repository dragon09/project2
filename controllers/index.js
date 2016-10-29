var express = require('express');
var ctrl = express.Router();

var express = require('express');
// var userCtrl = express.Router();
var usersForm = require('../models/users');
var bcrypt = require('bcryptjs');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Of Thrones Destinations' });
});

ctrl.get('home', renderHome)
ctrl.post('/login/return_user', attemptToLogin)
ctrl.get('/form', renderForm);
// ctrl.get('/login', function (req, res, next) {
// });
ctrl.get('login', renderLogin);
// ctrl.get('/', function(req, res, next) {
//   res.render('users', {})
// });
ctrl.post('/thisIsMyPostRoute', function(req, res, next) {
console.log(req.body, "this is req.body")
res.send('Thank You for logging in!')
});
// ctrl.post('/new', attemptToRegister, insertIntoUserAccountsTable);
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
