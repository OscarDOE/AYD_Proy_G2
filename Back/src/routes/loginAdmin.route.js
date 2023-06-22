const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/loginAdmin.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/loginAdmin', loginController.loginAdmin)
//router.post('/loginAdmin', loginController.loginAdmin)



module.exports = router