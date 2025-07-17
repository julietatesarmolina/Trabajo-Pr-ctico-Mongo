const {Router} = require("express");
const router = Router();
const post_imagesController = require("../controllers/post_ImagesController")
const Post_Images = require('../models/Post_Images')
const genericMiddleware = require('../middlewares/index')


router.get("/",  post_imagesController.obtenerImagenes);
router.post("/",  post_imagesController.crearImagenes);
router.put("/:id", genericMiddleware.existeModelById(Post_Images) ,post_imagesController.actualizarImagenes)
router.delete("/:id", genericMiddleware.existeModelById(Post_Images),post_imagesController.eliminarImagen)


module.exports = router;