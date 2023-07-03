const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/loginUser.controller')
const verifyToken = require('../middlewares/verifyToken')
//const verifyToken = require('../middlewares/verifyToken')
//router.post('/loginUser', verifyToken, loginController.loginUser)
router.post('/loginUser', loginController.loginUser)
router.post('/detallepago', verifyToken, loginController.setTarjeta)
router.post('/detalledir', verifyToken, loginController.setDireccion)


module.exports = router