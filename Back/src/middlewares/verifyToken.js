const jwt = require('jsonwebtoken')

//Funcion que verifica el token de autenticación, enviado en cada peticion a la API
function verifyToken (req, res, next) {
    //const token = req.headers['authorization']
    const {token} = req.body
    console.log("VERIFY TOKEN",req.body)
    if(!token){
        return res.status(401).json({auth: false, message: 'no token'})
    }
    jwt.verify(token, 'ayd1p1', (err, decoded) => {
        if(err){
            console.error(err.name, err.message)
            return res.json({auth: false, message: 'invalid token'})
        } 
        console.log(decoded)
        req.token = decoded
        next()
    })
    
}

module.exports = verifyToken