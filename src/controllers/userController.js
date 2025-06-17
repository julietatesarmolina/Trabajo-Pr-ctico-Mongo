const User = require('../models/user')



const obtenerUsuarios = async (_,res) =>{
    try {
        const usuarios = await User.find().select('nickName password email')
        if(!usuarios){
            res.status(404).json({message: 'No se encontraron usuarios'})
        }
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const crearUsuario = async (req,res) =>{
    try {
        const usuario = new User(req.body)
        await usuario.save()
        res.status(201).json({message: 'Usuario creado exitosamente'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const actualizarUsuario = async(req,res) =>{
    try {
        const { id } = req.params
        const { nickName , email } = req.body
        const usuario = await User.findByIdAndUpdate(id, {nickName: nickName, email:email})
        await usuario.save()
        res.status(201).json({message: 'Usuario actualizado exitosamente'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const eliminarUsuario = async (req, res) =>{
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(204)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}








module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}