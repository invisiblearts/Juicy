var mongoose = require('mongoose');

function BeatModel() {
    'use strict';
    var beatSchema = new mongoose.Schema({
        time: {type : Date, default: Date.now},
        text: String,
        featured: Boolean,
        image: Array,
        safe: Boolean
    });
    var beatModel = mongoose.model('beat', beatSchema);
/*    beatModel.prototype.set = setter;
    function setter(beat){

    }*/
    return beatModel;
}

module.exports = BeatModel();
