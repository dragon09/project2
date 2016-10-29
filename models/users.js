var db = require('./db');
var bookshelf = require('bookshelf')(db);

var usersModel = bookshelf.Model.extend({
  tableName: 'user_accounts'
});

console.log('form is working');

module.exports = usersModel;
