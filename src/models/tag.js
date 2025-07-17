const mongoose = require('mongoose')


const tagSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'El nombre de la etiqueta es obligatorio']   
   }
})


module.exports = mongoose.model('Tag', tagSchema)