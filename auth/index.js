require('dotenv').config();
var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var auth = require('./utils.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/**
 * @api {post} auth/signup Create Username and Password
 * @apiName Signup
 * @apiGroup Authentication
 * @apiParam {String} [username]  Create Username
 * @apiParam {String} [password]  Create Password
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successfully created credentials!"
 *     }
 */

router.post('/signup', function (request, response) {
  db.findUserByUsername(request.body.username)
    .then(function(user) {
      if (user) {
        response.json({
          error: 'Sorry, user already exists!'
        });
      } else {
        auth.createUser(request.body)
        .then(function(id) {
          response.json({
            message: 'Successfully created credentials!'
          });
        });
      }
  });
});

/**
 * @api {post} auth/login Login to use API
 * @apiName Login
 * @apiGroup Authentication
 * @apiParam {String} [username]  Your Username
 * @apiParam {String} [password]  Your Password
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "Jjdi4G76FDan8eb4k8d7dBBJ887Hye23492v
 *          .kdi5830f8ghtj66VB78NMpf04957ggUY5R4Wfh385j69fkdue96NMO098765tgy7jJL9jgdde4FftY765Thyu89UhytRr
 *          .fj49fksu456NU865rt97GhNcdeErhnh5467gGsGhgF"
 *     }
 */

router.post('/login', function (request, response) {
  db.findUserByUsername(request.body.username)
    .then(function(user) {
      var plainTextPassword = request.body.password;

      if ( user && bcrypt.compareSync(plainTextPassword, user.attributes.password) ) {
        delete user.attributes.password;

        jwt.sign(user.attributes, process.env.TOKEN_SECRET, { expiresIn: '1d' }, function(err, token) {
          console.log(token);
          if (err) {
            response.json({
              message: "Error creating token"
            });
          } else {
            response.json({
              token: token
            });
          }
        });
      } else {
        response.status(401);
        response.json({
          message: "UnAuthorized"
        });
      }
    }).catch(function(err) {
      response.status(503);
      response.json({
        message: err
      });
    });
});

module.exports = router;
