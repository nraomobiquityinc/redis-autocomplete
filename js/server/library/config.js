"use strict";

var fs = require('fs');
var config;
var configFile = __dirname + '/../../../config.json';
var configExists = fs.existsSync(configFile);

if (!configExists) {
  config = {
    "port": 8421
  };
} else {
  config = require(configFile);
}

module.exports = config;
