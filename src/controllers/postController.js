const Post = require('../models/post');
const Post_Images = require('../models/Post_Images');

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().select('user description').populate('images');
        if(!posts){
            res.status(204).json({message: 'No hay contenido' })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener las publicaciones'})
    }
}


const crearPost = async (req, res) => {
  try {
    const { userId, description, images } = req.body

    const nuevoPost = new Post({
      userId,
      description
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
    const postConImagenes = await Post.findById(nuevoPost._id)
      .populate('images');

    return res.status(201).json({message: "Publicación creada exitosamente", postConImagenes});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
}

const actualizarPost = async (req, res) => {
    try {
        const { id } = req.params
        const { description, images } = req.body

        const postActualizado = await Post.findByIdAndUpdate(id, {description: description}, {
            new: true,
            runValidators: true
        })

        if(!postActualizado){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }

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
        const post = await Post.findByIdAndDelete(id)

        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        
        await Post_Images.deleteMany({
            postId: id
        })

        res.status(200).json({message: 'Publicación eliminada', post});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la publicación'});
    }
}

const eliminarImagenPost = async (req, res) => {
    try {
        const postId = req.params.id
        const imageId = req.params.imageId
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'});
        }

        const imagenEliminada = await Post_Images.findOneAndDelete({
            _id: imageId,
            postId: postId
        })

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
        const postId = req.params.id
        const imageId = req.params.imageId
        const imageUrl = req.body.imageUrl

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'});
        }

        const imagenesActualizadas = Post_Images.findOneAndUpdate(
            {_id: imageId, postId: postId},
            {imageUrl: imageUrl},
            {new: true, runValidators: true}
        )

        if(!imagenesActualizadas){
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        
        res.status(200).json({message: 'Imagen actualizada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar la publicación'})
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