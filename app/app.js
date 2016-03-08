var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('./restify');
var log = require('./util/log');
var applyControllers = require('./controller');
var applyCorsMiddleWare = require('./util/cors-middle-ware');

(function app() {
    'use strict';
    var api = express();
    var db = 'mongodb://localhost/jcBeats';
    var port = 7788;

    run();

    ///////////////////

    function run() {
        api.use(bodyParser.urlencoded({extended: true}));
        api.use(bodyParser.json());
        api.use(methodOverride('X-HTTP-Method-Override'));

        applyCorsMiddleWare(api);
        applyControllers(api);
        restify(api, db);

        http.createServer(api)
            .listen(port, successLog(port));
    }

    function successLog(port) {
        log.info('JuicyBeatsAPI @ ' + port);
    }
})();
