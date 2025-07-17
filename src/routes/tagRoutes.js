const { Router } = require('express')
const router = Router()
const tagController = require('../controllers/tagController')
const Tag = require('../models/tag')
const genericMiddleware = require('../middlewares/index')

router.get("/", tagController.obtenerTags);
router.post("/", tagController.crearTag);
router.put("/:id" ,genericMiddleware.existeModelById(Tag), tagController.actualizarTag);
router.delete("/:id", genericMiddleware.existeModelById(Tag),tagController.eliminarTag);

module.exports = router;
