var beatsService = require('../../service/beatsService')();
var Util = require('../../util')();
var Promise = require('bluebird');

function beatsCtrl(api){
    api.get('/yymm/:yymm/duration/:offset', function(req, res) {
        var yymm = req.params.yymm;
        var offset = req.params.offset;

        var fromDate = Util.genDateByYYMM(yymm);
        var toDate = Util.genDateByYYMM(yymm, offset);
        beatsService.getInRange(fromDate, toDate).then(function(result){
            res.json({time:yymm,beats:result});
        });
    });
}

module.exports = beatsCtrl;
