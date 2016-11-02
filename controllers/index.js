var express = require('express');
var ctrl = express.Router();
var User = require('../models/User');
var Image = require('../models/Image');
var Location = require('../models/Location');
var multer = require('multer');
var crypto = require("crypto");
var mime = require("mime");

/*
User.where('id', 2).fetch({ withRelated: ["image", "image.location"] }).then(
      function (result) {
        debugger
      }
    );*/

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
  res.render('index', { title: 'Game Of Thrones Destinations' });
});

/*
  THis is just for testing
*/
if (process.env.NODE_ENV !== "production") {
  ctrl.use('/home', function (req, res, next) {

    if (req.session.user) {
      return next();
    }

    User.where("id", 2).fetch().then(function (result) {
      req.session.user = result.attributes;
      next();
    })
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
    debugger
    res.send(e);
  });
});


// ctrl.post('/thisIsMyPostRoute', function(req, res, next) {
// console.log(req.body, "this is req.body")
// res.send('Thank you for uploading an image.')
// });



function renderHome(req, res, next) {
  console.log(req.session);

  function renderTmpl (result) {
    var data = result.attributes;
    data.images = result.related("image").toArray().map(function (c) {
      c.attributes.location = Object(c.related("location")).attributes || {};
      return c.attributes;
    });
    debugger
    data.last_image = data.images.slice(-1)[0];

    /*
    data.first_name = data.first_name || "No Name";
    data.last_name = data.last_name || "No Name";
    data.caption = data.caption || "No Name";
    data.email = data.email || "No Name";*/

    Location.fetchAll().then(function (locations) {
      //locations.toArray().map(function (c) { return { id: c.attributes.id, label: c.attributes.location }})
      data.locations = locations.toArray();
      res.render('home', data)
    }).catch(function (err) {
      res.send(err);
    })
  }

  var _result = null;
  User.where('id', req.session.user.id).fetch({ withRelated: ["image"] }).then(
        function (result) {
            _result = result;

            return Promise.all(result.related("image").toArray().map(function (cImage) {
              var loc = cImage.get("location");
              if (!loc) { return null; }
              return Location.where("id", loc).fetch().then(function (loc) {
                cImage.relations.location = loc;
              })
            }).filter(Boolean))

        }).then(function () {
          console.log(_result)

          // res.json({result});
          renderTmpl(_result)
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
