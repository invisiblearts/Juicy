var BeatModel = require('./model');
var BeatAssembler = require('./assembler');
function BeatRepository() {
    return {
        getInRange : getInRange,
        getAvailableMonth : getAvailableMonth
    }
    function getInRange(fromDate, toDate){
        var crit = {
            'time': {'$gte': fromDate, '$lt': toDate}
        };
        return BeatModel.find(crit).sort({time:1}).exec()
               .then(BeatAssembler.addYYMM);
    }

    function getAvailableMonth(){
        var crit = {
          $group : {_id : { year: { $year : "$time" }, month: { $month : "$time" }}}
        };
        return BeatModel.aggregate(crit).exec()
              .then(BeatAssembler.dateToYYMM);
    }
}

module.exports = BeatRepository();
