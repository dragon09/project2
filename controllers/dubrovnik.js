var express = require('express');
var dubrovCtrl = express.Router();

/* GET home page. */
dubrovCtrl.get('/', function(req, res, next) {
  res.render('dubronvik', { title: 'King’s Landing' });
});



module.exports = dubrovCtrl;
