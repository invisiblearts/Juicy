var userModel = require('./user/model');
var beatModel = require('./beat/model');

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

module.exports = Models();
