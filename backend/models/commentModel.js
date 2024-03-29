const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const commentSchema = new Schema ({
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
const Comment = mongoose.model( 'Comment', commentSchema );
module.exports = Comment;