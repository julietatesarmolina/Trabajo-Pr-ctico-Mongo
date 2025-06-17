const {Router} = require("express");
const router = Router();
const post_imagesController = require("../controllers/post_ImagesController")

router.get("/",  post_imagesController.obtenerImagenes);
router.post("/",  post_imagesController.crearImagenes);
router.put("/:id", post_imagesController.actualizarImagenes)
router.delete("/:id", post_imagesController.eliminarImagen)


module.exports = router;