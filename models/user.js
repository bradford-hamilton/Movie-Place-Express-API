var bookshelf = require('../db/bookshelf');
require('./movie');

var User = bookshelf.Model.extend({
  tableName: 'user',
  movies: function() {
    return this.belongsToMany('Movie').through('User_Movie');
  }
});

module.exports = bookshelf.model('User', User);
