const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/reportesRepar.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/historial', verifyToken, loginController.historialPedido)
router.post('/historial', verifyToken, loginController.comisiones)

module.exports = router