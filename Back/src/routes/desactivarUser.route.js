const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/desactivarUser.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/desactivarUser', verifyToken, loginController.desactivarUser)
router.post('/desactivarEmpr', verifyToken, loginController.desactivarEmpr)
router.post('/desactivarRepr', verifyToken, loginController.desactivarRepr)

router.post('/resDesactivarU', verifyToken, loginController.resDesactivarU)
router.post('/resDesactivarR', verifyToken, loginController.resDesactivarR)
router.post('/resDesactivarE', verifyToken, loginController.resDesactivarE)

module.exports = router