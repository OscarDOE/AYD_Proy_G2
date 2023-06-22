const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/informeUser.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/informeUser', verifyToken, loginController.informeUser)


module.exports = router