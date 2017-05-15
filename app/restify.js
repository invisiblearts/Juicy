var restify = require('./lib/express-restify-mongoose');
var Models = require('./domain/models').getAll();
var jwt = require('jsonwebtoken');
var key = require('./key');
function Restify(app) {
  'use strict';
  var optionsComment = {
    findOneAndUpdate: false,
    preUpdate: function (req, res, next) {

      if (!req.erm.document || !req.erm.document.user || req.erm.document.user._id !== req.user.id) {
        if(req.params && req.params.id ==  req.user.id || req.user.isAdmin){
        }else
        return res.sendStatus(401)
      }
      res.sendStatus(204)
      next()
    },
    findOneAndRemove: false,
    preDelete: function (req, res, next) {
      if(!req.user.isAdmin) {
        if (!req.erm.document.user || req.erm.document.user._id !== req.user.id) {
          return res.sendStatus(401)
        }
      }

      req.erm.document.deletedAt = new Date();
      req.erm.document.save().then(function (doc) {
        res.sendStatus(204)
      }, function (err) {
        options.onError(err, req, res, next)
      })

      next()

    }
  };

  var options = {
    //    findOneAndUpdate: true,
    preUpdate: function (req, res, next) {

      if (!req.user.isAdmin) {
        return res.sendStatus(401)
      }
      next();
    },
    //    findOneAndRemove: false,
    preDelete: function (req, res, next) {

      if (!req.user.isAdmin) {
        return res.sendStatus(401)
      }
      /*
       req.erm.document.deletedAt = new Date();
       req.erm.document.save().then(function (doc) {
       res.sendStatus(204)
       }, function (err) {
       options.onError(err, req, res, next)
       })*/
      next();
    }
  };

  run();
  ///////////
  function run() {
    for (var key in Models) {
      restify.serve(app, Models[key], optionsComment);
    }
  }
}

module.exports = Restify;
