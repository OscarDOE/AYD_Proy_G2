const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/desactivarUser.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/desactivarUser', verifyToken, loginController.desactivarUser)
router.post('/resDesactivarU', verifyToken, loginController.resDesactivarU)
module.exports = router