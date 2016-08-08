var express = require('express');
var router = express.Router();

var movies = require('./movies');
router.use('/movies', movies);

module.exports = router;
