var restify = require('..');
var Models = require('./domain/models').getAll();
function Restify(app) {
    'use strict';
    run();
    ///////////
    function run() {
        for (var key in Models) {
            restify.serve(app, Models[key]);
        }
    }
}

module.exports = Restify;
