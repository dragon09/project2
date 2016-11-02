var db = require('./db');
var bookshelf = require('bookshelf')(db);

var Location = bookshelf.Model.extend({
  tableName: 'locations'
});

module.exports = Location;
