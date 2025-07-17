const Post = require('../models/post')
const Tag = require('../models/tag')

const obtenerCommentsTags = async (req,res) =>{
    try{
        const postId = req.params.postId
        const post = await Post.findById(postId).populate('tags' ,'id name');
        if(!post){
            return res.status(404).json({message: 'Post no encontrado'})
        }
        if(post.tags.length === 0){
            return res.status(201).json({message: 'No hay tags asociados a este post'})
        }
        res.status(200).json(post.tags);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const crearCommentTag = async (req, res) => {
    try{
        const {postId, tagId} = req.body;
        if(!postId || !tagId){
            return res.status(400).json({message: 'Post ID y Tag ID son requeridos'})
        }
        const post = await Post.findById(postId);
        const tag = await Tag.findById(tagId);
        if(!post || !tag){
            return res.status(404).json({message: 'Post o Tag no encontrado'})
        }
        if(post.tags.includes(tagId)){
            return res.status(400).json({message: 'El tag ya está asociado a este post'})
        }
        post.tags.push(tagId);
        await post.save();
        res.status(201).json({message: 'Tag agregado al post exitosamente', post});


    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const eliminarCommentTag = async (req, res) => {
    try{
        const {postId, tagId} = req.body;
        if(!postId || !tagId){
            return res.status(400).json({message: 'Post ID y Tag ID son requeridos'})
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: 'Post no encontrado'})
        }
        if(!post.tags.includes(tagId)){
            return res.status(400).json({message: 'El tag no está asociado a este post'})
        }
        post.tags = post.tags.filter(tag => tag.toString() !== tagId);
        await post.save();
        res.status(200).json({message: 'Tag eliminado del post exitosamente', post});
    }catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    obtenerCommentsTags,
    crearCommentTag,
    eliminarCommentTag
};