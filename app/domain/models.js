var userModel = require('./user/model');
var beatModel = require('./beat/model');
var topicModel = require('./topic/model');

function Models(){
    var models = {
        user: userModel,
        beat: beatModel,
        topic: topicModel
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

module.exports = Models();
