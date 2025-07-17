const {Router} = require("express");
const router = Router()
const commentTagsController = require("../controllers/commentTagsController")

router.get("/posts/:postId",commentTagsController.obtenerCommentsTags);
router.post("/", commentTagsController.crearCommentTag);
router.delete("/", commentTagsController.eliminarCommentTag);

module.exports = router;