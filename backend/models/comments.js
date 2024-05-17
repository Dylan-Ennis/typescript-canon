const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    storyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
