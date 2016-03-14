var Util = require('../../util')();
var Promise = require('bluebird');

function BeatAssembler(){
    return {
        addYYMM : addYYMM
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
}
module.exports = BeatAssembler();
