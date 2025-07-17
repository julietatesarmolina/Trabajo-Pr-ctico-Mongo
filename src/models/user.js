const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        minlength: [3, 'El nombre de usuario debe tener minimo 3 caracteres']
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria'],
        minlength: [2, 'La password debe tener minimo 2 caracteres']
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
}) 


module.exports = mongoose.model('User', userSchema)