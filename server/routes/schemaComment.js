const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    comment: { type: String, required: true },
    recipid: { type: Number, required: true },
    author: { type: Number, required: true },
    createdat: { type: Date, required: true }
});


const Comment = mongoose.model('Comment', commentSchema, 'comment');

module.exports = Comment;

