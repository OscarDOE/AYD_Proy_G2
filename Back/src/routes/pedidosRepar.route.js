const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/pedidosRepar.controller')
const verifyToken = require('../middlewares/verifyToken')
//router.post('/addCarrito', verifyToken, loginController.addCarrito)
router.post('/verPedidos', verifyToken, loginController.verPedidos)
router.post('/selectPedido', verifyToken, loginController.selectPedido)
router.post('/pedidoActual', verifyToken, loginController.pedidoActual)
router.post('/finPedido', verifyToken, loginController.finPedido)
module.exports = router