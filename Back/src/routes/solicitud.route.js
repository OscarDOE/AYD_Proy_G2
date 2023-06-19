const {Router} = require('express')
const router = Router()

const amigoController = require('../controllers/amigo.controller')
const verifyToken = require('../middlewares/verifyToken')

router.get('/solicitud/idUsuario/:idUsuario', verifyToken, amigoController.getSolicitudesAmistad)



module.exports = router