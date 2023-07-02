const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const  fileUpload  = require('express-fileupload');

const app = express()
const PORT = process.env.PORT || 4000; 


//Middlewares
/*app.use(express.json())
app.use(express.urlencoded({extended: false}))*/
app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(fileUpload())
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: './uploads'
//   }))


//Routes API
app.use(require('./routes/createUser.route'))
app.use(require('./routes/loginUser.route'))
app.use(require('./routes/calificar.route')) //PROBAR 
app.use(require('./routes/pedido.route')) //

app.use(require('./routes/createRepar.route'))
app.use(require('./routes/loginRepar.route'))
app.use(require('./routes/miPerfil.route'))
app.use(require('./routes/reportesRepar.route')) //PROBAR
app.use(require('./routes/pedidosRepar.route')) //

app.use(require('./routes/createEmpresa.route'))
app.use(require('./routes/loginEmpresa.route'))
app.use(require('./routes/agregarProducto.route'))

app.use(require('./routes/loginAdmin.route'))
app.use(require('./routes/solicitudRepar.route'))
app.use(require('./routes/solicitudEmp.route'))
app.use(require('./routes/informeUser.route'))
app.use(require('./routes/desactivarUser.route')) //PROBAR
//app.use(require('./routes/solicitudDepa.route')) //PROBAR



//Route Initial API
app.get('/', (req, res) => {
    res.send('AYD1 - FASE 1')
})


module.exports = app;