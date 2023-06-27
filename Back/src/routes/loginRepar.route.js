const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/loginRepar.controller')
//const verifyToken = require('../middlewares/verifyToken')
//router.post('/loginUser', verifyToken, loginController.loginUser)
router.post('/loginRepar', loginController.loginRepar)



module.exports = router