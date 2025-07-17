const {Router} = require("express");
const router = Router()
const commentController = require("../controllers/commentController")
const Comment = require('../models/comment')
const genericMiddleware = require('../middlewares')

router.get("/", commentController.obtenerComentarios);
router.post("/", commentController.crearComentario);
router.put("/:id",  genericMiddleware.existeModelById(Comment),commentController.actualizarComentario);
router.delete("/:id", genericMiddleware.existeModelById(Comment),commentController.eliminarComentario);

module.exports = router;