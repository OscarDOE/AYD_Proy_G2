const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/miPerfil.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/miPerfil', verifyToken, loginController.miPerfil)
router.post('/solicitud', verifyToken, loginController.cambioDep)

module.exports = router