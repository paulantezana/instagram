const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    by: {
        type:{},
        required: true
    },
    desc: String,
    photo: String,
    likedBy:{
        type: [],
        default: []
    },
    comments: {
        type: [],
        default: []
    },
    createdAt: {
        type: String,
        default: new Date
    }
})

module.exports = mongoose.model('posts',postSchema);