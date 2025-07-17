const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const User = require('../models/user')
const genericMiddleware = require('../middlewares/index')


//rutas
router.get('/', userController.obtenerUsuarios)
router.post('/' , userController.crearUsuario)
router.put('/:id', genericMiddleware.existeModelById(User), userController.actualizarUsuario)
router.delete('/:id' , genericMiddleware.existeModelById(User), userController.eliminarUsuario)


module.exports = router