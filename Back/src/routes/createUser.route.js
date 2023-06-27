const {Router} = require('express')
const router = Router()

const userController = require('../controllers/createUser.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/registroUser', userController.createUser)

module.exports = router