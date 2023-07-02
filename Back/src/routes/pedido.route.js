const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/pedido.controller')
const verifyToken = require('../middlewares/verifyToken')
//router.post('/addCarrito', verifyToken, loginController.addCarrito)
router.post('/pedir', verifyToken, loginController.pedirProducto)
router.post('/empresas', verifyToken, loginController.getEmpresas)
router.post('/menu', verifyToken, loginController.getMenu)
router.post('/producto', verifyToken, loginController.getProducto)
router.post('/categoria', verifyToken, loginController.getCategorias)
router.post('/historialUser', verifyToken, loginController.historialPedido)
router.post('/direccion', verifyToken, loginController.direccion)
router.post('/tarjeta', verifyToken, loginController.tarjeta)

module.exports = router