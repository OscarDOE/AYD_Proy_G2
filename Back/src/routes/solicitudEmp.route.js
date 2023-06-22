const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/solicitudEmp.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/solicitudEmp', verifyToken, loginController.solicitudEmp)



module.exports = router