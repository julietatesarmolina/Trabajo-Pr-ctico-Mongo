const { Router } = require('express')
const router = Router()
const followerController = require('../controllers/followerController')
// const Follower = require('../models/follower')
// const genericMiddleware = require('../middlewares/index')

router.get("/", followerController.obtenerFollows);
router.get("/:userId/obtenerSeguidores", followerController.obtenerSeguidores);
router.get("/:userId/obtenerSeguidos", followerController.obtenerSeguidos);
router.post("/:userId/follow", followerController.seguir);
router.delete("/:userId/unfollow/:unfollowedUserId", followerController.unfollow);

module.exports = router;