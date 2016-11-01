var express = require('express');
var ctrl = express.Router();
var User = require('../models/User');
var Image = require('../models/Image');
var multer = require('multer');


/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Of Thrones Destinations' });
});

ctrl.get('/home', renderHome)

ctrl.get('/about', function(req, res){
  res.render('about', {
    title: 'About Us'
  });
});

ctrl.get('/addPost', function(req, res){
  res.render('addPost', {
    title: 'Game of Thrones Destinations'
  });
});

ctrl.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact Us page'
  });
});


//multer
/* POST /home */
ctrl.post('/home', multer({dest: './uploads'}).single('upload'), function (req, res) {
  console.log(req.body);
  console.log(req.file);
    // res.send("File uploaded");
    // req.file.path

    var account = new Image({
      path: req.file.path,
      description: req.body.title,
      mimetype: req.file.mimetype,
      comment: ''
    }).save().then(function(result) {
      res.send('Thank you for uploading an image.');
    });

});


// ctrl.post('/thisIsMyPostRoute', function(req, res, next) {
// console.log(req.body, "this is req.body")
// res.send('Thank you for uploading an image.')
// });



function renderHome(req, res, next) {
  console.log(req.session);

  if(req.session.theResultsFromModelInsertion){

    User.where('email', req.session.theResultsFromModelInsertion).fetch().then(
      function (result) {
        console.log(result)
        // res.json({result});
        res.render('home', result.attributes)
      });
  } else {
    res.render('home', {first_name:'No Name', email:''});
  }
};



function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);


var model = new User(req.body).save().then(function (data) {
  res.render('home', data.attributes);
});
};



module.exports = ctrl;
