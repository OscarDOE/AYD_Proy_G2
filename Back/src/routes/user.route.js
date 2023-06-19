const {Router} = require('express')
const router = Router()

const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/registro', userController.createUser)
router.put('/updateUsuario', userController.updateUser)

module.exports = router