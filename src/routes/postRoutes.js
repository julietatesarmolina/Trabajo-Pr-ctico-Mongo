const { Router } = require('express')
const router = Router()
const postController = require('../controllers/postController')
const Post = require('../models/post')
const genericMiddleware = require('../middlewares/index')


//rutas
router.get("/", postController.obtenerPosts)
router.post("/", postController.crearPost)
router.put("/:id", genericMiddleware.existeModelById(Post),postController.actualizarPost)
router.put("/:id/images/:imageId", genericMiddleware.existeModelById(Post), postController.actualizarImagenPost)
router.delete("/:id", genericMiddleware.existeModelById(Post) ,postController.eliminarPost)
router.delete("/:id/images/:imageId", genericMiddleware.existeModelById(Post), postController.eliminarImagenPost)

module.exports = router;