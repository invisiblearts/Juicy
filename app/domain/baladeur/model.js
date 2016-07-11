var mongoose = require('mongoose');

function BaladeurModel() {
    'use strict';

    var baladeurSchema = new mongoose.Schema({
        createdAt: {type : Date, default: Date.now},
        description: String,
        genre: String,
        image: Array,
        emo: Number,
        express: Number,
        ids:Array,
        title: String,
        artist: String
    });
    var baladeurModel = mongoose.model('baladeur', baladeurSchema);
    /*    beatModel.prototype.set = setter;
     function setter(beat){

     }*/
    return baladeurModel;
}

module.exports = BaladeurModel();
