var Movie = require('../models/movie');
var User = require('../models/user');
var User_Movie = require('../models/user_movie');

module.exports = {

  Movie: {

    get: function(id){
      if (id) {
        return Movie.where({ id: id })
          .fetch({ withRelated: 'users' })
          .then(function(collection) {
            return collection.toJSON();
          });
      } else {
        return Movie.forge()
          .orderBy('title', 'ASC')
          .fetchAll({ withRelated: 'users' })
          .then(function(collection) {
            return collection.toJSON();
          });
      }
    },

    insert: function(formData) {
      return Movie.forge().save(formData);
    },

    update: function(id, body) {
      return Movie.forge({ id: id })
        .fetch()
        .then(function(movie) {
          return movie.save(body);
        });
    },

    destroy: function(id) {
      return User_Movie.where({ movie_id: id })
        .destroy()
        .then(function() {
          return Movie.where({ id: id })
          .destroy();
        });
    }

  },

  User: {

  },

  findUserByUsername: function(username) {
    return User.where({ username: username })
    .fetch();
  },

  addUser: function(body){
    return User.forge().save(body);
  }


};
