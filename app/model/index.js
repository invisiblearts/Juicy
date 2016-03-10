var mongoose = require('mongoose');

var userModel = require('./user')(mongoose);
var beatModel = require('./beat')(mongoose);

function Models(){
    var models = {
        user: userModel,
        beat: beatModel
    };

    return {
        getAll: getAll,
        get: getOne
    }

    function getAll(){
        return models;
    }

    function getOne(name){
        return models[name];
    }


}

module.exports = Models;
