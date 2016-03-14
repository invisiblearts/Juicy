var mongoose = require('mongoose');

function BeatModel() {
    'use strict';
    var beatSchema = new mongoose.Schema({
        time: {type : Date, default: Date.now},
        text: {type: String},
        featured: {type: Boolean},
        safe:{type: Boolean}
    });
    var beatModel = mongoose.model('beat', beatSchema);
    beatModel.prototype.set = setter;
    function setter(beat){

    }
    return beatModel;
}

module.exports = BeatModel();
