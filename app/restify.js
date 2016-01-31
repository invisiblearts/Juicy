var mongoose = require('mongoose');
var restify = require('..');
var userModel = require('./model/user')(mongoose);
var siteModel = require('./model/site')(mongoose);

function Restify(app, uri) {
    'use strict';

    run();

    ///////////

    function run() {
        mongoose.connect(uri);
        restify.serve(app, userModel);
        restify.serve(app, siteModel);
    }
}

module.exports = Restify;
