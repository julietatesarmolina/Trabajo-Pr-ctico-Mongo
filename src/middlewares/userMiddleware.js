const User = require('../models/user')

const existeUsuario = async (req, res, next) =>{
    const { id } = req.params
    const usuario = await User.findById(id)
    if(!usuario){
        return res.status(404).json({message: 'Usuario no encontrado'})
    }
    next()
    
}


module.exports = {existeUsuario}