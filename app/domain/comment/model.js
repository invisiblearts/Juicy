var mongoose = require('mongoose');

function CommentModel() {
    var commentSchema = new mongoose.Schema({
        body: {type: String},
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    });
    return mongoose.model('comment', commentSchema);
}

module.exports = CommentModel();

