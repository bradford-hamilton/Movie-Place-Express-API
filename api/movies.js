var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var Movie = require('../models/movie');
var User = require('../models/user');
var User_Movie = require('../models/user_movie');
var modify = require('../scripts/modify');

/**
 * @apiDefine AuthorizationHeader
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer Jjdi4G76FDan8eb4k8d7dBBJ887Hye23492v
 *          .kdi5830f8ghtj66VB78NMpf04957ggUY5R4Wfh385j69fkdue96NMO098765tgy7jJL9jgdde4FftY765Thyu89UhytRr
 *          .fj49fksu456NU865rt97GhNcdeErhnh5467gGsGhgF"
 *     }
 */

/**
 * @api {get} /api/movies Request List of Movies
 * @apiUse AuthorizationHeader
 * @apiName GetMovies
 * @apiGroup Movies
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "id": 1,
 *          "title": "Interstellar",
 *          "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
 *          "year": 2014,
 *          "image_url": "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_UY1200_CR69,0,630,1200_AL_.jpg",
 *          "rating": 10,
 *          "users": [
 *             {
 *              "username": "PiedPiper"
 *             },
 *             {
 *              "username": "PhishPhan46"
 *             }
 *        },
 *        {
 *          "id": 2,
 *          "title": "The Imitation Game",
 *          "description": "During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.",
 *          "year": 2014,
 *          "image_url": "http://ia.media-imdb.com/images/M/MV5BNDkwNTEyMzkzNl5BMl5BanBnXkFtZTgwNTAwNzk3MjE@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
 *          "rating": 9,
 *          "users": [
 *             {
 *              "username": "PiedPiper"
 *             },
 *             {
 *              "username": "PhishPhan46"
 *             }
 *        }
 *     ]
 */

router.get('/', function(request, response, next) {
  db.Movie.get()
  .then(function(data) {
    modify.removeSensitiveInfoFromMultiple(data)
  .then(function(data) {
    response.json(data);
    });
  });
});

/**
 * @api {get} /api/movies/:id Request Movies with ID
 * @apiUse AuthorizationHeader
 * @apiName GetSpecificMovieInfo
 * @apiGroup Movies
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "title": "The Theory of Everything",
 *       "description": "A look at the relationship between the famous physicist Stephen Hawking and his wife.",
 *       "year": 2014,
 *       "image_url": "http://www.impawards.com/intl/uk/2014/posters/theory_of_everything.jpg",
 *       "rating": 8,
 *       "users": [
 *         {
 *           "username": "PiedPiper"
 *         },
 *         {
 *          "username": "PhishPhan46"
 *         }
 *       ]
 *     }
 */

router.get('/:id', function(request, response, next) {
  db.Movie.get(request.params.id)
  .then(function(data) {
    modify.removeSensitiveInfoFromOne(data)
  .then(function(data) {
    response.json(data);
    });
  });
});

/**
 * @api {post} api/movies Create Movie
 * @apiUse AuthorizationHeader
 * @apiName PostMovies
 * @apiGroup Movies
 * @apiParam {String} [title]  Title of Movie.
 * @apiParam {String} [description]  Description of Movie.
 * @apiParam {Number} [year]  Year of Movie.
 * @apiParam {String} [image_url]  Url of Movie Poster.
 * @apiParam {Number} [rating]  Rating of Movie.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "The Imitation Game was inserted successfully!"
 *     }
 */

router.post('/', function(request, response, next) {
  db.Movie.insert(request.body)
  .then(function(data) {
    var message = data.attributes.title + ' was inserted successfully!';
    response.json({
      message: message
    });
  });
});

/**
 * @api {put} api/movies/:id Update Movie with ID
 * @apiUse AuthorizationHeader
 * @apiName PutMovies
 * @apiGroup Movies
 * @apiParam {String} [title]  Title of Movie.
 * @apiParam {String} [description]  Description of Movie.
 * @apiParam {Number} [year]  Year of Movie.
 * @apiParam {String} [image_url]  Url of Movie Poster.
 * @apiParam {Number} [rating]  Rating of Movie.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Movie succesfully updated!"
 *     }
 */

router.put('/:id', function(request, response, next) {
  db.Movie.update(request.params.id, request.body)
  .then(function(data) {
    response.json({
      message: 'Movie succesfully updated!'
    });
  });
});

/**
 * @api {delete} api/movies/:id Delete Movie with ID
 * @apiUse AuthorizationHeader
 * @apiName DeleteMovies
 * @apiGroup Movies
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successfully removed movie!"
 *     }
 */

router.delete('/:id', function(request, response, next) {
  db.Movie.destroy(request.params.id)
  .then(function(data) {
    response.json({
      message: 'Successfully removed movie!'
    });
  });
});


module.exports = router;
