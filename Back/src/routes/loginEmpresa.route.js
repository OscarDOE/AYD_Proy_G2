const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/loginEmpresa.controller')
//const verifyToken = require('../middlewares/verifyToken')
//router.post('/loginUser', verifyToken, loginController.loginUser)
router.post('/loginEmpresa', loginController.loginEmpresa)



module.exports = router