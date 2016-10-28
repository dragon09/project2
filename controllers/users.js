var express = require('express');
var userCtrl = express.Router();
var bcrypt = require('bcryptjs');

userCtrl.get('/login', function (req, res, next) {

});

/* GET users listing. */
// userCtrl.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

userCtrl.get('/', function(req, res, next) {
  res.render('users', {})
});

// userCtrl.post('/login', function (req, res, next) {
//
// });

userCtrl.post('/thisIsMyPostRoute', function(req, res, next) {
  console.log(req.body, "this is req.body")
  res.send('Thank You for logging in!')
});





userCtrl.post('/register', attemptToRegister);
userCtrl.post('/login', attemptToLogin);




function attemptToRegister(req, res, next) {
  // var password = 'lololol42';
  // var hash = createPasswordHash(password);
  // console.log(hash);
  // first, we need an Account model
  // a user with a form would pass in req.body
  // { email: '', password_hash: ''}
  console.log('attemptToRegister', req.body.email, req.body.password);

  var password = req.body.password;
  var hashedPassword = createPasswordHash(password);
  var account = new Account({
    email: req.body.email,
    password_hash: hashedPassword
  }).save().then(function(result) {
    //res.render
    console.log(result);
    res.json(result);
  });
};

function createPasswordHash (password) {
  var salt = 10; // salt factor of 10
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
function comparePasswordHashes (input, db) {
  //input: user's attempted to login
  var hash = createPasswordHash(input);
  return bcrypt.compareSync(input, db);
};

function attemptToLogin(req, res, next) {
  var password = req.body.password;

  console.log('attemptToLogin',req.body.email, req.body.password )


  // TEMP
  var password = 'thisisapassword'; // <- user's password, not stored in db directly
  var passwordHashed = createPasswordHash(password); // <- hashed password will be stored in the database
  var attempt = comparePasswordHashes(req.body.password, passwordHashed);
  res.json({'is_logged_in': attempt})
  return;

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
};




module.exports = userCtrl;
