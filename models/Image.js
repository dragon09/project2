var db = require('./db');
var bookshelf = require('bookshelf')(db);

var Image = bookshelf.Model.extend({
  tableName: 'images'
});

console.log('Image is working');

module.exports = Image;
