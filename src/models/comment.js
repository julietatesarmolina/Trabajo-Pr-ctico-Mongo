const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Id del usuario obligatorio']
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Id del post obligatorio']
    },
    text: {
        type: String,
        required: [true, 'El texto es obligatorio'],
        minlength: [5, 'El texto debe tener como mínimo 5 caracteres'],
        maxlength: [250, 'El texto como máximo debe tener 250 caracteres']
    }
})


module.exports = mongoose.model('Comment', commentSchema)