const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minlength:5
    },
    role: {
        type: Number
    }
});

const User = mongoose.model('TEST', userSchema)
module.exports = { User };