var Util = require('../../util')();
var Promise = require('bluebird');
var Beats = require('../../domain/beat/repository');

function beatsCtrl(api){
    api.get('/yymm/:yymm/duration/:offset', function(req, res) {
        var yymm = req.params.yymm;
        var offset = req.params.offset;

        var fromDate = Util.genDateByYYMM(yymm);
        var toDate = Util.genDateByYYMM(yymm, offset);

        output(Beats.getInRange(fromDate, toDate), res);
    //  Inline res.json calling looks bad with bind()
    //  Beats.getInRange(fromDate, toDate).then(res.json.bind(res));
    });

    function output(promise,res){
        promise.then(res.json.bind(res));
    }
}


module.exports = beatsCtrl;
