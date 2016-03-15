var Util = require('../../util')();
var Promise = require('bluebird');
var Beats = require('../../domain/beat/repository');

function beatsRest(api){
    api.get('/yymm/:yymm/duration/:offset', function(req, res) {
        var yymm = req.params.yymm;
        var offset = req.params.offset;

        var fromDate = Util.genDateByYYMM(yymm);
        var toDate = Util.genDateByYYMM(yymm, offset);
        Beats.getInRange(fromDate, toDate)
          .then(r => res.json(r))
    });
}


module.exports = beatsRest;
