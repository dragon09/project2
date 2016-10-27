var express = require('express');
var ctrl = express.Router();
var CatModel = require('../models/CatModel');

/* GET /cats/create */
ctrl.get('/create', create);
/* Get /cats/id/number */
ctrl.get('/id/:id', findById);
/* GET /cats/all */
ctrl.get('/all', findAll);
/* GET /cats */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* create row w/bookshelf */
function create(req, res, next) {
  //req.body contain whatever our form sends
  var kirby = { name: 'Kirby' };
  var model = new CatModel(kirby).save().then(function(result) {
    res.json(result);
    //res.render('template', result.attributes);
    //res.render('cat-create') // -> cat-create.hbs
  });
};

function findById(req, res, next) {
    var id = req.params.id; // typically going to be our ID
    var model = CatModel.where({
      id: id
    }).fetch().then(function(result) {
      res.json(result);
      // res.render('cat', { name: result.name }) // -> cat.hbs
    });
  console.log(model);
};

function findAll(req, res, next) {
  CatModel.collection().fetch().then(function(results) {
    res.json(results);
  });
};

module.exports = ctrl;
