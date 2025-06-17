const { Router } = require('express')
const router = Router()
const tagController = require('../controllers/tagController')

router.get("/", tagController.obtenerTags);
router.post("/", tagController.crearTag);
router.put("/:id", tagController.actualizarTag);
router.delete("/:id", tagController.eliminarTag);

module.exports = router;
