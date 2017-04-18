var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restifyDB = require('./restify');
var log = require('./util/log');
var applyCustomRestfulAPIs = require('./interface');
var mongoose = require('mongoose');
var key = require('./key');
var jwt = require('express-jwt');
var cachegoose = require('cachegoose');
var path = require('path');

(function app() {
  'use strict';
  var api = express();
  var db = 'mongodb://localhost/jcBeats';
  var port = 7788;

  run();

  ///////////////////

  function run() {
    mongoose.connect(db);
    applyMiddleWares(api);

    cachegoose(mongoose, {
      engine: 'redis', 
      port: 6379, 
      host: 'localhost'
    });


    restifyDB(api);
    applyCustomRestfulAPIs(api);
    api.use(express.static(path.join(__dirname, 'web/static')));
    api.use('/dev', express.static(path.join(__dirname, 'web/src')));

    http.createServer(api)
      .listen(port, successLog(port));
  }

  function applyMiddleWares(api) {
    api.use(methodOverride('X-HTTP-Method-Override'));
    api.use(jwt({secret: key, credentialsRequired: false}));
    applyCorsMiddleWare(api);
    applyBodyParsingMiddleWare(api);
  }

  function applyCorsMiddleWare(api) {
    api.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7788');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
  }

  function applyBodyParsingMiddleWare(api) {
    api.use(bodyParser.urlencoded({extended: true}));
    api.use(bodyParser.json());
  }

  function successLog(port) {
    log.info('Juicy Serving @ ' + port);
  }
})();
