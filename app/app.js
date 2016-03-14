var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restifyDB = require('./restify');
var log = require('./util/log');
var applyCustomRestfulAPIs = require('./facade');
var mongoose = require('mongoose');

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
        applyCustomRestfulAPIs(api);
        restifyDB(api);
        http.createServer(api)
            .listen(port, successLog(port));
    }

    function applyMiddleWares(api){
        api.use(methodOverride('X-HTTP-Method-Override'));
        applyCorsMiddleWare(api);
        applyBodyParsingMiddleWare(api);
    }

    function applyCorsMiddleWare(api){
        api.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
    }

    function applyBodyParsingMiddleWare(api){
        api.use(bodyParser.urlencoded({extended: true}));
        api.use(bodyParser.json());
    }

    function successLog(port) {
        log.info('JuicyBeatsAPI @ ' + port);
    }
})();
