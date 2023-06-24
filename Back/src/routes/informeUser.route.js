const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/informeUser.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/informeUser', verifyToken, loginController.informeUser)
router.post('/totalUser', verifyToken, loginController.totalUser)

module.exports = router