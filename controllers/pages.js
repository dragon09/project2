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

        var images = images && images.toArray();
        //console.log('IMAGES', images)

        //images.forEach( image=>console.log('IMG', image) )
        //console.log(currentCountry)
        res.render('page', { title: currentCountry.attributes.location, images: images })
    }).catch(function (err) {
      next(err)
    })
});

/*

ctrl.get('/croatia', function(req, res, next){
  res.render('page', { title: 'Welcome to Kings Landing' });
});

ctrl.get('/iceland', function(req, res, next){
  res.render('page', { title: 'Welcome to The Wall' });
});


ctrl.get('/spain', function (req, res, next) {
  res.render('page', { title: 'Welcome to Dorne'});
});

ctrl.get('/malta', function (req, res, next) {
  res.render('page', { title: 'This is Malta!'});
});

ctrl.get('/ireland', function (req, res, next) {
  res.render('page', { title: 'Welcome to Winterfell'});
});
*/


module.exports = ctrl;
