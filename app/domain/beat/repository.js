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
        return BeatModel.find(crit).populate([{"path":"tags"},{"path":"comments","populate":{"path":"user"}}]).sort({time:1}).cache(7200).exec()
               .then(BeatAssembler.addYYMM);
    }

    function getAvailableMonth(){
        var crit = {
          $group : {_id : { year: { $year : "$time" }, month: { $month : "$time" }}}
        };
        return BeatModel.aggregate(crit).cache(432000).exec()
              .then(BeatAssembler.dateToYYMM);
    }
}

module.exports = BeatRepository();
