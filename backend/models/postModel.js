const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
});

const Post = mongoose.model( 'Post',postSchema );
module.exports = Post;