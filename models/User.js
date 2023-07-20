const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'avatar.png',
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = User = mongoose.model('user', userSchema)