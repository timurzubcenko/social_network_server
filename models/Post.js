const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    like: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }]
    },
    comments: {
        type: [{
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
            },
            login: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            },
        }],
    }
})

module.exports = Post = mongoose.model('post', postSchema)