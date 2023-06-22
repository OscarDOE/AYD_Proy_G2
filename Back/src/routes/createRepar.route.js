const {Router} = require('express')
const router = Router()

const userController = require('../controllers/createRepar.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/registroRepar', userController.createRepar)

module.exports = router