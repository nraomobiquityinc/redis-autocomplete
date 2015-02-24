var express = require('express');
var path = require('path');
var router = module.exports = express.Router();
var redisService = require(path.join(__dirname, '/redisService.js'));

router.route('/')
  .get(function(request, response) {
    response.render('index');
  });

router.route('/api/suggestions/:limit/:fragment')
  .get(function(request, response) {
    var limit = request.params.limit;
    var fragment = request.params.fragment;
    redisService.getMatches(limit, fragment, function(matches) {
      response.send(matches);
    });
  });
