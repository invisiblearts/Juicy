var BeatModel = require('./model');
var BeatAssembler = require('./assembler');
function BeatRepository() {
    return {
        getInRange : getInRange
    }
    function getInRange(fromDate, toDate){
        var crit = {
            'time': {'$gte': fromDate, '$lt': toDate}
        };
        return BeatModel.find(crit).sort({time:1}).exec()
               .then(BeatAssembler.addYYMM);
    }
}

module.exports = BeatRepository();
