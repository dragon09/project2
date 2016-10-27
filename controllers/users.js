var express = require('express');
var userCtrl = express.Router();

userCtrl.get('/login', function (req, res, next) {

});

/* GET users listing. */
// userCtrl.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

userCtrl.get('/', function(req, res, next) {
  res.render('users', {})
});

userCtrl.post('/login', function (req, res, next) {

});

userCtrl.post('/thisIsMyPostRoute', function(req, res, next) {
  console.log(req.body, "this is req.body")
  res.send('Thank You for logging in!')
});








module.exports = userCtrl;
