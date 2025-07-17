const Comment = require('../models/comment');
const Post = require('../models/post');


const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comment.find().select('text createdAt userId postId');
        if (!comentarios || comentarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron comentarios' });
        }
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const crearComentario = async (req, res) => {
    try {
        const { postId, userId, text, createdAt } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        const comentario = new Comment({ postId, userId, text, createdAt }); // si no hay createdAt, usa el default
        await comentario.save();

        post.comment.push(comentario._id);
        await post.save();

        res.status(201).json({ message: "Comentario creado exitosamente", comentario });
    } catch (error) {
        res.status(400).json({ error: "Error al crear el comentario" });
    }
};


const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const comentarioActualizado = await Comment.findByIdAndUpdate(
            id,
            { text },
            { new: true, runValidators: true }
        );

        if (!comentarioActualizado) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        res.status(200).json({ message: "Comentario actualizado exitosamente", comentario: comentarioActualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comment.findByIdAndDelete(id);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }


        await Post.findByIdAndUpdate(comentario.postId, {
            $pull: { comment: comentario._id }
        });

        res.status(200).json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerComentarios,
    crearComentario,
    actualizarComentario,
    eliminarComentario
};
