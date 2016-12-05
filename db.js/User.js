var db = require('./db');
var bookshelf = require('bookshelf')(db);
var Image = require("./Image");

var User = bookshelf.Model.extend({
  tableName: 'user_accounts',
  image: function() {
    return this.hasMany(Image, "user");
  }
});

console.log('form is working');

module.exports = User;
