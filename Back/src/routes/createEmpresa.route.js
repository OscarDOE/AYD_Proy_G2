const {Router} = require('express')
const router = Router()
const multer = require('multer');
const userController = require('../controllers/createEmpresa.controller')
const verifyToken = require('../middlewares/verifyToken')

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Directorio donde se guardarán los archivos subidos
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo guardado en el servidor
    }
});
  
const upload = multer({ storage: storage });



// router.post('/registroEmpresa', userController.createEmpresa)
router.post('/registroEmpresa', upload.single('imagenes'), userController.createEmpresa);

module.exports = router


