const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/reportesRepar.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/historialRep', verifyToken, loginController.historialPedido)//
router.post('/comision', verifyToken, loginController.comisiones)//

module.exports = router