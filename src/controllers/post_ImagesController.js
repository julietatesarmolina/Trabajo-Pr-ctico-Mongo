const Post_Images  = require('../models/Post_Images')

const obtenerImagenes = async (req, res) => {
    try {
        const imagenes = await Post_Images.find().select('postId imageUrl')
        if(imagenes.length === 0){
            return res.status(204).json({ error: "No se encontraron archivos" })
        }
        res.status(200).json(imagenes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const crearImagenes = async (req, res) => {
    try {
        const imagenesACrear = Array.isArray(req.body) ? req.body : [req.body]

        const imagenesCreadas = await Promise.all(
            imagenesACrear.map(async (imagen) => {
                const nueva = new Post_Images(imagen)
                await nueva.save()
                return nueva
            })
        )
        res.status(200).json({message: "Imagenes creadas exitosamente", imagenesCreadas})
    } catch (error) {
        res.status(500).json({ error: "error al subir los archivos" })
    }
}

const actualizarImagenes = async (req, res) => {
    try {
        const { id } = req.params
        const { postId, imageUrl } = req.body

        const imagen = await Post_Images.findByIdAndUpdate(id, {postId: postId, imageUrl:imageUrl})
        await imagen.save()
        res.status(200).json({message: "imagen actualizada", imagen})
    } catch (error) {
        res.status(500).json({ error: "error al actualizar las imagenes" })
    }
}

const eliminarImagen = async (req, res) => {
    try {
        const { id } = req.params
        await Post_Images.findByIdAndDelete(id)
        res.status(201).json({message: "Imagen eliminada"})
    } catch (error) {
        res.status(500).json({ error: "error al eliminar las imagenes" })
    }
}


module.exports = {
    obtenerImagenes,
    crearImagenes,
    actualizarImagenes,
    eliminarImagen
}