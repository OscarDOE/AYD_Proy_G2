const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/informeUser.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/informeUser', verifyToken, loginController.informeUser)
router.post('/totalUser', verifyToken, loginController.totalUser)
router.post('/top5Deliverys', verifyToken, loginController.top5Deliverys)
router.post('/top5Empresas', verifyToken, loginController.top5Empresas)
router.post('/top5Productos', verifyToken, loginController.top5Productos)


router.post('/masVendido', verifyToken, loginController.masVendido)
router.post('/historialP', verifyToken, loginController.historialP)

module.exports = router