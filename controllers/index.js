var express = require('express');
var ctrl = express.Router();

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = ctrl;
