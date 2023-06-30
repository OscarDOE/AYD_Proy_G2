const {Router} = require('express')
const router = Router()

const loginController = require('../controllers/calificar.controller')
const verifyToken = require('../middlewares/verifyToken')
router.post('/calificar', verifyToken, loginController.calificar)


module.exports = router