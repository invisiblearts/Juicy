function Util(){
    return {
        genDateByYYMM : genDateByYYMM
    };

    function genDateByYYMM(yymm, offset){
        var year = parseInt('20' + yymm.substring(0, 2), 10);
        var month = parseInt(yymm.substring(2, 4), 10) - 1;
        if(offset){
            month += parseInt(offset);
        }
        return new Date().setFullYear(year, month, 1);
    }

}
module.exports = Util;
