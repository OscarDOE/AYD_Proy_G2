const jwt = require('jsonwebtoken')

//Funcion que verifica el token de autenticación, enviado en cada peticion a la API
function verifyToken (req, res, next) {
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({auth: false, message: 'no token'})
    }
    jwt.verify(token, 'semi1practica2', (err, decoded) => {
        if(err){
            console.error(err.name, err.message)
            return res.json({auth: false, message: 'invalid token'})
        } 
        console.log(decoded)
        //req.userId = decoded.id
        next()
    })
    
}

module.exports = verifyToken