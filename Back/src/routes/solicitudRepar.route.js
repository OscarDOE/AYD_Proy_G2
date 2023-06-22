const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudRepar.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudRepar', verifyToken, loginController.solicitudRepar)



module.exports = router