const {Router} = require("express");
const router = Router()
const commentController = require("../controllers/commentController")

router.get("/", commentController.obtenerComentarios);
router.post("/", commentController.crearComentario);
router.put("/:id", commentController.actualizarComentario);
router.delete("/:id", commentController.eliminarComentario);

module.exports = router;