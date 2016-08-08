var Movie = require('../models/movie');
var User = require('../models/user');
var User_Movie = require('../models/user_movie');
var db = require('../db/queries');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

  createUser: function(body) {
    var hash = bcrypt.hashSync(body.password, 8);
    body.password = hash;
    return db.addUser(body)
    .then(function(user) {
      return user.attributes.id;
    });
  },

  authMiddleware: function(request, response, next) {
    var token = request.get('Authorization');
    if (token) {
      // Authorization header value is in the format:
      // Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW...
      // Remove the first part "Bearer " using substring
      token = token.substring(7);
      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) {
          // An error signals that the token was not able to be verified
          // Since this Middleware runs on all requests,
          // we call next to continue onto the rest of the middlewares
          // req.user will be undefined in subsequent middlewares/routes
          next();
        } else {
          // If there was no error, the token was verified and decoded
          request.user = decoded;
          // req.user will contain the JWT payload in subsequent middlewares/routes
          next();
        }
      });
    } else {
      // Didn't find authorization token
      next();
    }
  },

  ensureAuthenticated: function(request, response, next) {
    if (request.user) {
      next();
    } else {
      response.json({
        message: "UnAuthorized!"
      });
    }
  }

};
