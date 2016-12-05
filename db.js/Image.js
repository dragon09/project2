var db = require('./db');
var bookshelf = require('bookshelf')(db);
var Location = require("./Location");
var User = require("./User");


var Image = bookshelf.Model.extend({
  tableName: 'images',
  /*location: function() {
    return this.hasOne(Location, 'location');
  },*/
  user: function() {
    return this.belongsTo(User, 'id');
  }
});

console.log('Image is working');

module.exports = Image;
