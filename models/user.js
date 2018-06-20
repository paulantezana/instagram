const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "El campo usuario es requerido"]
    },
    password: String,
    desc: String,
    bio: String,
    email: String,
    thumbnail: "String",
    posts: {
        type: [],
        default: []
    },
    following: {
        type: [],
        default: []
    },
    followers: {
        type: [],
        default: []
    }
});

module.exports = mongoose.model('users',UserSchema);