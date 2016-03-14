function Util(){
    return {
        genDateByYYMM : genDateByYYMM,
        genYYMMByDate : genYYMMByDate
    };

    function genDateByYYMM(yymm, offset){
        var year = parseInt('20' + yymm.substring(0, 2), 10);
        var month = parseInt(yymm.substring(2, 4), 10) - 1;
        if(offset){
            month += parseInt(offset);
        }
        return new Date().setFullYear(year, month, 1);
    }

    function genYYMMByDate(date){
        var month = (date.getMonth() + 1).toString();
        month = month.length > 1 ? month : '0' + month;
        var year =  date.getFullYear().toString().substring(2, 4);
        return year + month;
    }

}
module.exports = Util;
