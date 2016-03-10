var beatModel = require('../model')().get('beat');
var Log = require('../util/log');
var async = require('async')

function beatsService(){
    return {
        getInRange: getInRange
    };

    function getInRange(fromDate, toDate){
        var crit = {
            'time': {'$gte': fromDate, '$lt': toDate}
        };
        return beatModel.find(crit).sort({time:1}).exec();
    }
}

module.exports = beatsService;
