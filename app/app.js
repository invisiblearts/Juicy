var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('./restify');
var log = require('./util/log');

(function app() {
    'use strict';
    var kiraAPI = express();
    var dbURI = 'mongodb://localhost/kirakira';
    var kiraPort = 7788;

    run(kiraAPI, dbURI, kiraPort);

    ///////////////////

    function run(app,uri,port) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(methodOverride('X-HTTP-Method-Override'));

        restify(app, uri);
        http.createServer(app).listen(port, successLog(port));
    }

    function successLog(port) {
        log.info('KiraAPI @ ' + port);
    }

})();