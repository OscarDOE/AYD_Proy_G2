const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/loginUser.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/loginUser', verifyToken, loginController.loginUser)



module.exports = router