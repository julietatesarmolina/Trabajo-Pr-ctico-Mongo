const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')


//rutas
router.get('/', userController.obtenerUsuarios)
router.post('/' , userController.crearUsuario)
router.put('/:id', userMiddleware.existeUsuario, userController.actualizarUsuario)
router.delete('/:id' , userMiddleware.existeUsuario, userController.eliminarUsuario)



module.exports = router