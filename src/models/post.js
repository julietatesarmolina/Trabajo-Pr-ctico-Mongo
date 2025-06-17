const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuario obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post_Images'
    }]
})

module.exports = mongoose.model('Post', postSchema)