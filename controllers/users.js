var express = require('express');
var userCtrl = express.Router();

/* GET users listing. */
userCtrl.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = userCtrl;


// var express = require('express');
// var userCtrl = express.Router();
// var usersForm = require('../models/users');
// var bcrypt = require('bcryptjs');

// userCtrl.get('home', renderHome)
// userCtrl.post('/login/return_user', attemptToLogin)
// userCtrl.get('/users', renderUsers);
// userCtrl.get('/login', function (req, res, next) {
// });
// userCtrl.get('login', renderLogin);
// userCtrl.get('/', function(req, res, next) {
//   res.render('users', {})
// });
// userCtrl.post('/thisIsMyPostRoute', function(req, res, next) {
//   console.log(req.body, "this is req.body")
//   res.send('Thank You for logging in!')
// });
// userCtrl.post('/create', attemptToRegister, insertIntoUserAccountsTable);
// userCtrl.post('/register', attemptToRegister);
// userCtrl.post('/login', attemptToLogin);

/* GET users listing. */
// userCtrl.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// userCtrl.post('/login', function (req, res, next) {
//
// });
// function renderHome(req, res, next) {
//   console.log(req.session)
//   usersModel.where('email', req.session.theResultsFromModelInsertion).fetch().then(
//     function (result) {
//       console.log(result)
//       res.json({result});
//     });
//     res.render('home', {})
// };
//
// function renderLogin(req, res, next) {
//   res.render('login', {});
// };
//
//
// function insertIntoUserAccountsTable(req, res, next) {
//   console.log(req.body);
//
//
// var model = new usersModel(req.body).save().then(function (data) {
//   res.render('home', data.attributes);
// });
// };
//
// function attemptToRegister(req, res, next) {
  // var password = 'lololol42';
  // var hash = createPasswordHash(password);
  // console.log(hash);
  // first, we need an Account model
  // a user with a form would pass in req.body
  // { email: '', password_hash: ''}
  // console.log('attemptToRegister', req.body.email, req.body.password);
  // console.log(req.session);
  // var password = req.body.password;
  // var hashedPassword = createPasswordHash(password);
  // var account = new usersModel({
  //   email: req.body.name,
  //   password_hash: hashedPassword
  // }).save().then(function(result) {
  //   eq.session.theResultsFromModelInsertion = result.attributes.email;
  //   console.log(result.attributes.email);
  //   res.redirect('/home')
    // console.log(result);
    // res.json(result);
//   });
// };
//
// function createPasswordHash (password) {
//   var salt = 10; // salt factor of 10
//   var hash = bcrypt.hashSync(password, salt);
//   return hash;
// };
// function comparePasswordHashes (input, db) {
  //input: user's attempted to login
  // var hash = createPasswordHash(input);
//   return bcrypt.compareSync(input, db);
// };
//
// function attemptToLogin(req, res, next) {
//   var password = req.body.password;
//   usersModel.where('email', req.body.email).fetch().then(
//     function (result) {
//       var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
//       res.json({'is_logged_in': attempt})
//     });
  // console.log('attemptToLogin',req.body.email, req.body.password )


  // TEMP
  // var password = 'thisisapassword'; // <- user's password, not stored in db directly
  // var passwordHashed = createPasswordHash(password); // <- hashed password will be stored in the database
  // var attempt = comparePasswordHashes(req.body.password, passwordHashed);
  // res.json({'is_logged_in': attempt})
  // return;

  //
  // // who is our user?
  // Account.where('email', req.body.email).fetch().then(
  //   function(result) {
  //     // we now have our user: result
  //     // next, we need their password! (to compare it)
  //     // bcrypt.compareSync(password, hash); // returns true/false
  //     // console.log(result);
  //     // model attributes on results are sometimes stored on results.attributes
  //     var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);
  //     // then we share the results
  //     res.json({'is_logged_in': attempt });
  //   }
  // )
// };
//
//
//
//
// module.exports = userCtrl;
