var express = require('express');
var ctrl = express.Router();

/* GET /dubrovnik */
ctrl.get('/dubrovnik', function(req, res, next) {
  res.render('page', { title: 'King’s Landing' });
});

/* GET /reykijvik */
ctrl.get('/reykjavik', function(req, res, next){
  res.render('page', { title: 'Reykjavík' });
})

ctrl.get('/', function (req, res, next) {
  res.render('/index', {home: 'Home link'})
})



module.exports = ctrl;
