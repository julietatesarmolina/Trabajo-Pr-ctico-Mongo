const mongoose = require('mongoose')


const followerSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario seguidor es requerido']   
    },
    followed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario seguido es requerido']  
    }
})


module.exports = mongoose.model('Follower', followerSchema)