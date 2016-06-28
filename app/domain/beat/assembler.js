var Util = require('../../util')();
var Promise = require('bluebird');

function BeatAssembler(){
    return {
        addYYMM : addYYMM,
        dateToYYMM : dateToYYMM
    }
    function addYYMM(beats){
        var res = {};
        res.beats = beats;
        if(beats.length && beats[0]){
            date = new Date(beats[0].time);
            res.time = Util.genYYMMByDate(date);
        }
        return res;
    }

    function dateToYYMM(data){
        var res = data.map(i=>Util.genYYMM(d._id.year,d._id.month));
        
        return res;
    }
}
module.exports = BeatAssembler();
