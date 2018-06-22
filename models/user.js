const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "El campo usuario es requerido"],
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 30],
                message: 'El nombre de usuario debe contener entre {ARGS[0]} y {ARGS[1]} caracteres',
            }),
            validate({
                validator: 'isAlphanumeric',
                message: 'El nombre debe contener solo caracteres alfanuméricos',
            })
        ]
    },
    password: String,
    fullname: String,
    desc: String,
    bio: String,
    email: {
        type: String,
        validate: validate({
            validator: 'isEmail',
            message: 'Ingrese un email válido',
        }),
    },
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