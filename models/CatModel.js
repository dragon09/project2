var db = require('./db'); // database :)
var bookshelf = require('bookshelf')(db);

var CatModel = bookshelf.Model.extend({
  tableName: 'cats'
});

module.exports = CatModel;
