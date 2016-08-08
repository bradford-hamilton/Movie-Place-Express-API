var bookshelf = require('../db/bookshelf');
require('./movie');
require('./user');

var User_Movie = bookshelf.Model.extend({
  tableName: 'user_movie',
  user: function () {
    return this.hasMany('Movie');
  },
  movie: function () {
    return this.hasMany('User');
  }
});

module.exports = bookshelf.model('User_Movie', User_Movie);
