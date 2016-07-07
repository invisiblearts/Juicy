var mongoose = require('mongoose');

function LinksModel() {
    'use strict';
    var linksSchema = new mongoose.Schema({
        title: {type: String},
        description: {type: String},
        img: {type: String},
        alias:{type: String},
        color:{type: String},
        href:{type: String}

});
    return mongoose.model('links', linksSchema);
}

module.exports = LinksModel();

