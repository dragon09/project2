var express = require('express');
var ctrl = express.Router();

var Location = require("../models/Location");
var Image = require("../models/Image");

/* GET /dubrovnik */
ctrl.get('/:country', function(req, res, next) {
  var currentCountry = null;
  Location
    .where("country", req.params.country.charAt(0).toUpperCase() + req.params.country.slice(1))
    .fetch().then(function (country) {

      if (!country) {
        next();
      } else {
        currentCountry = country;
        return Image.where("location", country.get("id")).fetchAll();
      }
    }).then(function (images) {
        if (!currentCountry) { return; }
      debugger
        res.render('page', { title: currentCountry.location, images: images && images.toArray() })
    }).catch(function (err) {
      next(err)
    })

});


/*
ctrl.get('/reykjavik', function(req, res, next){
  res.render('page', { title: 'Reykjavík' });
});

//link back to homepage
// ctrl.get('/', function(req, res, next) {
//   res.render('index', { title: 'Game Of Thrones Destinations' });
// });

ctrl.get('/osuna', function (req, res, next) {
  res.render('page', { title: 'Plaza de Toros'});
});

ctrl.get('/edinburgh', function (req, res, next) {
  res.render('page', { title: 'Doune Castle'});
});

ctrl.get('/northireland', function (req, res, next) {
  res.render('page', { title: 'The Dark Hedges'});
});
*/


module.exports = ctrl;
