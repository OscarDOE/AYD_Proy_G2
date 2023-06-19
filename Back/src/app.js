const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 4000; 


//Middlewares
/*app.use(express.json())
app.use(express.urlencoded({extended: false}))*/
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//Routes API
app.use(require('./routes/auth.route'))
app.use(require('./routes/user.route'))
app.use(require('./routes/solicitud.route'))


//Route Initial API
app.get('/', (req, res) => {
    res.send('AYD1 - FASE 1')
})


app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`); 
})