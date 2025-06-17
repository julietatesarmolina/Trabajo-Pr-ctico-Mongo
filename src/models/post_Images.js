const mongoose = require('mongoose');

const post_ImagesSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: [true, 'El post es obligatorio'] 
    },
    imageUrl: { 
        type: String, 
        required: [true, 'La url es obligatoria'] 
    }
})

module.exports = mongoose.model('Post_Images', post_ImagesSchema)