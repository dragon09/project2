var express = require('express');
var ctrl = express.Router();
var path = require('path');
var Image = require('../models/Image');

/* GET /images/3 */
ctrl.get('/:id', function(req, res){
  Image.where('id', req.params.id).fetch().then(
    function (result) {
      console.log(result)
      if (!result) {
        return res.end();
      }
      // res.json({result});
      // res.render('home', result.attributes)
      var mimetype = 'image/jpeg';
      if(result.attributes.mimetype) { mimetype = result.attributes.mimetype; }

      var fullpath =  path.join(__dirname, '..', result.attributes.path);
      console.log('PATH', fullpath)
      res.type(mimetype);
      res.sendFile(fullpath);
    });
})



module.exports = ctrl;
