const Tag  = require('../models/tag')

const obtenerTags = async (req, res) => {
   try {
       const tags = await Tag.find().select('name')
       if(!tags){
           return res.status(404).json({message: 'No se encontraron etiquetas'})
       }
       res.status(200).json(tags)
   } catch (error) {
       res.status(500).json({error: error.message})
   }
}


const crearTag = async (req, res) => {
   try {
       const tag = new Tag(req.body)
       await tag.save()
       res.status(201).json({message: 'Etiqueta creada exitosamente', tag})

   } catch (error) {
       res.status(400).json({error: "Error al crear la etiqueta"})
   }
}


const actualizarTag = async (req, res) => {
   try {
       const { id } = req.params
       const { name } = req.body
       if(!name){
           return res.status(400).json({ error: "Solicitud incorrecta" })
       }
       await Tag.findByIdAndUpdate(id, {name: name}, {new: true, runValidators: true})

       res.status(200).json({ message: "Etiqueta actualizada exitosamente"})
   } catch (error) {
       res.status(500).json({ error: error.message})
   }
}


const eliminarTag = async (req, res) => {
   try {
       const { id } = req.params
       await Tag.findByIdAndDelete(id)

       res.status(201).json({message: 'Etiqueta eliminada exitosamente'})
   } catch (error) {
       res.status(500).json({error: error.message})
   }
}


module.exports = {
   obtenerTags,
   crearTag,
   actualizarTag,
   eliminarTag
}
