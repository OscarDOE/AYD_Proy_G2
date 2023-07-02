const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudRepar.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudRepar', verifyToken, loginController.solicitudRepar)
router.post('/respuestaRepar', verifyToken, loginController.respuestaRepar)

router.post('/solicitudCambio', verifyToken, loginController.solicitudRepar)
router.post('/respuestaCambio', verifyToken, loginController.respuestaRepar)

module.exports = router