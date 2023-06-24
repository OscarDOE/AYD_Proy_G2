const {Router} = require('express')
const router = Router()

const userController = require('../controllers/AgregarProducto')
const verifyToken = require('../middlewares/verifyToken')

router.post('/AgregarProducto', userController.AgregarProducto)
router.post('/EditarProducto', userController.EditarProducto)
router.post('/EliminarProducto', userController.EliminarProducto)
router.post('/RealizarPedido', userController.RealizarPedido)
router.post('/ObtenerProductos', userController.ObtenerProductos)

module.exports = router