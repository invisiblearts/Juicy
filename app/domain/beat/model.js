var mongoose = require('mongoose');
var Tag = [require('../tag/model').schema];

function BeatModel() {
    'use strict';
    
    var beatSchema = new mongoose.Schema({
        time: {type : Date, default: Date.now},
        text: String,
        featured: Boolean,
        image: Array,
        safe: Boolean,
        tag: Tag
    });
    var beatModel = mongoose.model('beat', beatSchema);
/*    beatModel.prototype.set = setter;
    function setter(beat){

    }*/
    return beatModel;
}

module.exports = BeatModel();
