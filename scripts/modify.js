module.exports = {

  removeSensitiveInfoFromMultiple: function(data) {
    return new Promise(function(resolve, reject) {
      data.forEach(function(movie) {
        movie.users.forEach(function(user) {
          delete user.id;
          delete user.password;
          delete user._pivot_id;
          delete user._pivot_movie_id;
          delete user._pivot_user_id;
        });
      });
      resolve(data);
    });
  },

  removeSensitiveInfoFromOne: function(data) {
    return new Promise(function(resolve, reject) {
      data.users.forEach(function(user) {
        delete user.id;
        delete user.password;
        delete user._pivot_id;
        delete user._pivot_movie_id;
        delete user._pivot_user_id;
      });
      resolve(data);
    });
  }

};
