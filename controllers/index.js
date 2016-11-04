var express = require('express');
var ctrl = express.Router();
var User = require('../models/User');
var Image = require('../models/Image');
var Location = require('../models/Location');
var multer = require('multer');
var crypto = require("crypto");
var mime = require("mime");
var fs = require('fs');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Of Thrones ||  Globe Trott' });
});

/*
  THis is for testing
*/
if (process.env.NODE_ENV !== "production") {
  ctrl.use('/home', function (req, res, next) {
    if (req.session.user) {
      return next();
    }
    next();

  });
}

ctrl.use('/home', function (req, res, next) {

  if (req.session.user) {
    return next();
  }

  res.redirect('/users/register');
});

ctrl.get('/home', renderHome)

ctrl.get('/about', function(req, res){
  res.render('about', {
    title: 'Game Of Thrones ||  Globe Trott'
  });
});

ctrl.get('/addPost', function(req, res){
  res.render('addPost', {
  title: 'Game Of Thrones ||  Globe Trott'
  });
});

ctrl.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Game Of Thrones ||  Globe Trott'
  });
});



//multer
/* POST /home */
ctrl.post('/home', multer({ storage: storage }).single('upload'), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  var queue = null;
  var updateUser = function(result) {
    return User.where("id", req.session.user.id).fetch().then(function (user) {
      return user.save({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        image: result && result.attributes.id,
        caption: req.body.title,
        email: req.body.email,
        password_hash: user.get("password_hash")
      });
    })
  };

  if (req.file) {
    queue = new Image({
      path: req.file.filename,
      description: req.body.title,
      mimetype: req.file.mimetype,
      comment: '',
      user: req.session.user.id,
      location: +req.body.location || 1
    }).save().then(updateUser);
  } else {
    queue = updateUser();
  }
  queue.then().then(function () {
  res.redirect("/home");
  }).catch(function (e) {
    res.send(e);
  });
});


function renderHome(req, res, next) {
  console.log(req.session);



  function renderTmpl (resultUser) {
    var user = resultUser.attributes;
    user.images = resultUser.related("image").toArray().map(function (c) {
      c.attributes.location = Object(c.related("location")).attributes || {};
      return c.attributes;
    });
    user.last_image = user.images.slice(-1)[0];

    /*
    user.first_name = user.first_name || "No Name";
    user.last_name = user.last_name || "No Name";
    user.caption = user.caption || "No Name";
    user.email = user.email || "No Name";*/

    Location.fetchAll().then(function (locations) {
      //locations.toArray().map(function (c) { return { id: c.attributes.id, label: c.attributes.location }})
      user.locations = locations.toArray();
      res.render('home', user)
    }).catch(function (err) {
      res.send(err);
    })
  }

//user selects locations and views log in info to upload and update gets data from db
  var _resultUser = null;
  User.where('id', req.session.user.id).fetch({ withRelated: ["image"] }).then(
    function (resultUser) {
        _resultUser = resultUser;

        return Promise.all(resultUser.related("image").toArray().map(function (cImage) {
          var location = cImage.get("location");
          if (!location) { return null; }
          return Location.where("id", location).fetch().then(function (location) {
            cImage.relations.location = location;
          })
        }).filter(Boolean))

    }).then(function () {
      console.log(_resultUser)

      //res.json(_resultUser);

      renderTmpl(_resultUser)
    }).catch(function (e) {
      res.send(e.stack);
    });
};



function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);


var model = new User(req.body).save().then(function (data) {
  res.render('home', data.attributes);
});
};



module.exports = ctrl;
