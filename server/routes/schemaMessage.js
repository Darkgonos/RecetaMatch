const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, validate: validator.isEmail},
    message: { type: String, required: true },
    readit: { type: Number, required: true },
    createdat: { type: Date, required: true }
});


const Message = mongoose.model('Message', messageSchema, 'message');

module.exports = Message;

