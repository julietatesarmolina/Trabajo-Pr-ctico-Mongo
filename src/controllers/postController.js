const Post = require('../models/post');
const Post_Images = require('../models/Post_Images');
const User = require('../models/user');
const Comment = require('../models/comment');
require('dotenv').config();


const obtenerPosts = async (req, res) => {
   try {
    const meses = parseInt(process.env.MESES_COMENTARIOS_VISIBLES) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses);
    const posts = await Post.find().select('-__v ').populate('images', '-__v').populate('tags' , '-__v').lean() 
    const postsConComentarios = await Promise.all(
        posts.map(async post => {
        const comentarios = await Comment.find({
            _id: { $in: post.comment }, 
            createdAt: { $gte: fechaLimite } 
        })
        .populate('userId', 'nickName')
        .select('-__v ');
        delete post.comment;
        return {
            ...post,
            comments: comentarios 
        };
      })
    );

    return res.status(200).json(postsConComentarios);
   } catch (error) {
       res.status(500).json({error: 'Error al obtener las publicaciones'})
   }
}



const crearPost = async (req, res) => {
    try {
    const { userId, description, images, createdAt } = req.body

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message: 'Usuario no encontrado'})
    }
   
    const nuevoPost = new Post({
        userId,
        description,
        createdAt: createdAt || Date.now()
    });
    await nuevoPost.save();


    if (images && Array.isArray(images) && images.length > 0) {
        const imagenes = images.map(img => ({
            postId: nuevoPost._id,
            imageUrl: img.imageUrl
        }));


        const imagenesGuardadas = await Post_Images.insertMany(imagenes);

        nuevoPost.images = imagenesGuardadas.map(img => img._id);
        await nuevoPost.save();
    }
    const postConImagenes = await Post.findById(nuevoPost._id).populate('images').select('id userId description images');


    return res.status(201).json({message: "Publicación creada exitosamente", postConImagenes});
    }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la publicación' });
    }
}


const actualizarPost = async (req, res) => {
   try {
       const { id } = req.params
       const { description, images } = req.body


    await Post.findByIdAndUpdate(id, {description: description}, {
        new: true,
        runValidators: true
       })

       if(Array.isArray(images)){
           await Post_Images.deleteMany({postId: id})
       }

       if(images.length > 0){
           const imagenesPost = images.map( url => ({
               postId: id,
               imageUrl: url.imageUrl
           }))
           await Post_Images.insertMany(imagenesPost)
       }

       const post = await Post.findById(id).populate('images', 'imageUrl')
       res.status(200).json({message: 'Publicacion actualizada exitosamente'}, post);
   } catch (error) {
       res.status(400).json({ mensaje: 'Error al actualizar el post', error })
   }
}


const eliminarPost = async (req, res) => {
   try {
       const { id } = req.params
       await Post.findByIdAndDelete(id).select('id userId description')
       await Post_Images.deleteMany({
           postId: id
       })

       res.status(200).json({message: 'Publicación eliminada'});
   } catch (error) {
       res.status(500).json({error: 'Error al eliminar la publicación'});
   }
}


const eliminarImagenPost = async (req, res) => {
   try {
       const postId = req.params.id
       const imageId = req.params.imageId
       const post = await Post.findById(postId)

       const imagenEliminada = await Post_Images.findOneAndDelete({_id: imageId,})

       if(!imagenEliminada){
           return res.status(404).json({message: 'Imagen no encontrada'})
       }
       post.images.pull(imageId)
       await post.save()
       res.status(200).json({message: 'Imagen eliminada exitosamente'})

   } catch (error) {
       res.status(500).json({error: 'Error al eliminar la imagen'})
   }
}


const actualizarImagenPost = async (req, res) => {
    try {
         const imageId = req.params.imageId
         const { imageUrl } = req.body

        const imagenActualizada = await Post_Images.findOneAndUpdate(
            { _id: imageId},
            { imageUrl: imageUrl },
            { new: true, runValidators: true }
        )
        if(!imagenActualizada){
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        res.status(200).json({message: 'Imagen actualizada exitosamente', imagen: imagenActualizada})
    }
    catch (error){
        res.status(500).json({error: 'Error al actualizar la imagen'})
    }
}




module.exports = {
   obtenerPosts,
   crearPost,
   actualizarPost,
   eliminarPost,
   eliminarImagenPost,
   actualizarImagenPost
}
