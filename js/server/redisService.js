var redis = require('redis');
var redisClient = redis.createClient();
var fs = require('fs');
var path = require('path');
var lineReader = require('line-reader');
var _ = require('lodash');

var wordSetName = "words:";
var corpus = path.join(__dirname, 'corpus/names.txt');

function initIndex() {
  var wordNum = 0;
  lineReader.eachLine(corpus, function(line, last) {
    addWord(line, wordNum);
    wordNum = wordNum + 1;
  });
}

function addWord(word, wordNum) {
  redisClient.set(wordSetName + wordNum, word);
  var index;
  for (index = 1; index <= word.length; index++) {
    var fragment = word.substr(0, index);

    //For a given fragment, a corresponding word gets a higher
    //score if the fragment makes up a greater part of it.
    //For example, given fragment "amber", the word "amber" will have
    //a higher score than the word "amberous" because the fragment
    //"amber" makes up a greater proportion of the word "amber" than
    //"amberous".
    var score = index / word.length;

    //store wordNum (rather than the word itself) to save space
    redisClient.zadd(fragment, score, wordNum);
  }
}

initIndex();

exports.getMatches = function(limit, fragment, callback) {
  redisClient.zrevrange(fragment, 0, limit - 1, function(err, matchingKeys) {
    if (err) throw err;
    else {
      if (_.isEmpty(matchingKeys)) return callback([]);

      matchingKeys = _.map(matchingKeys, function(matchingKey) {
        return wordSetName + matchingKey;
      });

      redisClient.mget(matchingKeys, function(err, matches) {
        if (err) throw err;
        matches = _.map(matches, function(match) {
          return {
            "text": match
          }
        });
        return callback({
          "matches": matches
        });
      });
    }
  });
}
