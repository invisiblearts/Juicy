function BeatModel(mongoose) {
    'use strict';
    var beatSchema = new mongoose.Schema({
        time: {type : Date, default: Date.now},
        text: {type: String},
        featured: {type: Boolean},
        safe:{type: Boolean}
    });
    
    return mongoose.model('beat', beatSchema);
}

module.exports = BeatModel;
