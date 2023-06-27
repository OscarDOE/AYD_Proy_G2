const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudEmp.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudEmp', verifyToken, loginController.solicitudEmp)
router.post('/respuestaEmp', verifyToken, loginController.respuestaEmp)


module.exports = router