var express = require('express');
var ctrl = express.Router();

/* GET /dubrovnik */
ctrl.get('/dubrovnik', function(req, res, next) {
  res.render('page', { title: 'King’s Landing' })
});


/* GET /reykijvik */
ctrl.get('/reykjavik', function(req, res, next){
  res.render('page', { title: 'Reykjavík' });
});

//link back to homepage
ctrl.get('/', function(req, res, next) {
  res.render('index')
})


ctrl.get('/osuna', function (req, res, next) {
  res.render('page', { title: 'Plaza de Toros'});
});

ctrl.get('/edinburgh', function (req, res, next) {
  res.render('page', { title: 'Doune Castle'});
});

ctrl.get('/northireland', function (req, res, next) {
  res.render('page', { title: 'The Dark Hedges'});
});



module.exports = ctrl;
