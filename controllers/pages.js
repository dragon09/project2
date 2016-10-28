var express = require('express');
var ctrl = express.Router();

/* GET /dubrovnik */
ctrl.get('/dubrovnik', function(req, res, next) {
  res.render('page', { title: 'King’s Landing' });
});

/* GET /reykijvik */
ctrl.get('/reykijvik', function(req,res){
  res.render('page', { title: 'Reykijvik' });
})



module.exports = ctrl;
