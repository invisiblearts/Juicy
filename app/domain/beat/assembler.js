var Util = require('../../util')();

function BeatAssembler(){
    return {
        addYYMM : addYYMM,
        dateToYYMM : dateToYYMM
    };
    
    function addYYMM(beats){
        var res = {};
        res.beats = beats;
        if(beats.length && beats[0]){
            var date = new Date(beats[0].time);
            res.time = Util.genYYMMByDate(date);
        }
        return res;
    }

    function dateToYYMM(data){
        return data.map(i=>Util.genYYMM(i._id.year,i._id.month));
    }
}
module.exports = BeatAssembler();
