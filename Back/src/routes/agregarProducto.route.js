const {Router} = require('express')
const router = Router()
const multer = require('multer');
const userController = require('../controllers/AgregarProducto')
const NuevoCombo = require('../controllers/NuevoCombo')
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

router.post('/AgregarProducto', upload.single('foto'), userController.AgregarProducto);
// router.post('/EditarProducto', upload.single('foto'), userController.EditarProducto);
// router.post('/EliminarProducto', upload.single('foto'), userController.EliminarProducto);
// router.post('/RealizarPedido', upload.single('foto'), userController.RealizarPedido);
router.post('/ObtenerProductos', userController.ObtenerProductos)

// router.post('/AgregarProducto', userController.AgregarProducto)
// router.post('/EditarProducto', userController.EditarProducto)
// router.post('/EliminarProducto', userController.EliminarProducto)
// router.post('/RealizarPedido', userController.RealizarPedido)
// router.post('/ObtenerProductos', userController.ObtenerProductos)

router.post('/NuevoCombo',NuevoCombo.NuevoCombo)
module.exports = router