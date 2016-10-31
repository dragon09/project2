var db = require('./db');
var bookshelf = require('bookshelf')(db);

var User = bookshelf.Model.extend({
  tableName: 'user_accounts'
});

console.log('form is working');

module.exports = User;
