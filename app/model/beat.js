function BeatSchema(mongoose) {
    'use strict';
    var beatSchema = new mongoose.Schema({
        time: {type : Date, default: Date.now},
        text: {type: String},
        featured: {type: Boolean},
        safe:{type: Boolean}
    });
    var beat = mongoose.model('beat', beatSchema);

    return beat;
}

module.exports = BeatSchema;
