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
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema)