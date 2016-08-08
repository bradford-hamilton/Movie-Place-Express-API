var bookshelf = require('../db/bookshelf');
require('./user');

var Movie = bookshelf.Model.extend({
  tableName: 'movie',
  users: function() {
    return this.belongsToMany('User').through('User_Movie');
  }
});

module.exports = bookshelf.model('Movie', Movie);
