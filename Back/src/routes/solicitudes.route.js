const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudes.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudes', verifyToken, loginController.solicitudes)



module.exports = router