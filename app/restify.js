var restify = require('..');
var Models = require('./domain/models').getAll();
var jwt = require('jsonwebtoken');
function Restify(app) {
    'use strict';
    var optionsComment = {
        findOneAndUpdate: false,
        preUpdate: function (req, res, next) {
            jwt.verify(token, 'shhhhh', function(err, decoded) {
                req.user = decoded.user;
            });

            if (req.erm.document.user._id !== req.user._id) {
                return res.sendStatus(401)
            }

            req.erm.document.set('lastRequestAt', new Date());

            next()
        },
        findOneAndRemove: false,
        preDelete: function (req, res, next) {
            jwt.verify(token, 'shhhhh', function(err, decoded) {
                req.user = decoded.user;
            });

            if (req.erm.document.user._id !== req.user._id) {
                return res.sendStatus(401)
            }

            req.erm.document.deletedAt = new Date();
            req.erm.document.save().then(function (doc) {
                res.sendStatus(204)
            }, function (err) {
                options.onError(err, req, res, next)
            })
        }
    };

    var options = {
        findOneAndUpdate: false,
        preUpdate: function (req, res, next) {
            if(req.header['Authorization']) {
                var token = req.header['Authorization'].slice("bearer".length);
                jwt.verify(token, 'shhhhh', function (err, decoded) {
                    req.user = decoded.user;
                });

                if (!req.user.isAdmin) {
                    return res.sendStatus(401)
                }

                req.erm.document.set('lastRequestAt', new Date());
            }else{
                return res.sendStatus(401)
            }

            next()
        },
        findOneAndRemove: false,
        preDelete: function (req, res, next) {
            if(req.header['Authorization']) {
                var token = req.header['Authorization'].slice("bearer".length);
                jwt.verify(token, 'shhhhh', function (err, decoded) {
                    req.user = decoded.user;
                });

                if (!req.user.isAdmin) {
                    return res.sendStatus(401)
                }
            }else{
                return res.sendStatus(401)
            }

            req.erm.document.deletedAt = new Date();
            req.erm.document.save().then(function (doc) {
                res.sendStatus(204)
            }, function (err) {
                options.onError(err, req, res, next)
            })
        }
    };

    run();
    ///////////
    function run() {
        for (var key in Models) {
            restify.serve(app, Models[key],options);
        }
    }
}

module.exports = Restify;
