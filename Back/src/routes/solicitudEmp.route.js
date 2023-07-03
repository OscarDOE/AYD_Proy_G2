const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudEmp.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudEmp', verifyToken, loginController.solicitudEmp)
router.post('/respuestaEmp', verifyToken, loginController.respuestaEmp)
router.post('/solicitudPed', verifyToken, loginController.solicitudPed)
router.post('/respuestaPed', verifyToken, loginController.respuestaPed)

module.exports = router