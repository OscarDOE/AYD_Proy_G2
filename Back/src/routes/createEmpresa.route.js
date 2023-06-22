const {Router} = require('express')
const router = Router()

const userController = require('../controllers/createEmpresa.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/registroEmpresa', userController.createEmpresa)

module.exports = router


