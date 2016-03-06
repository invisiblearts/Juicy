var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('./restify');
var log = require('./util/log');

(function app() {
    'use strict';
    var kiraAPI = express();
    var dbURI = 'mongodb://localhost/jcBeats';
    var kiraPort = 7788;

    run(kiraAPI, dbURI, kiraPort);

    ///////////////////

    function run(app,uri,port) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(methodOverride('X-HTTP-Method-Override'));

        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        restify(app, uri);
        http.createServer(app).listen(port, successLog(port));
    }

    function successLog(port) {
        log.info('JuicyBeatsAPI @ ' + port);
    }

})();
