const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
            },
            auth: false,
            message:
                "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
        });

    const hashContra = crypto.createHash("md5").update(password).digest("hex");

    // Iniciar sesión del usuario
    mysqlConnection.query(
        "SELECT * FROM administrador,usuario WHERE usuario.usuario = ? and usuario.id = administrador.usuario_id",
        [username],
        async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error SQL - LoginAdmin" });
            }

            if (!result[0])
                return res
                    .status(401)
                    .json({
                        status: "FAILED",
                        auth: false,
                        message: "Credenciales inválidas",
                    });
            else if (result[0].password !== hashContra)
                return res
                    .status(401)
                    .json({
                        status: "FAILED",
                        auth: false,
                        message: "Credenciales inválidas",
                    });

            //Si los datos son correctos se genera el token
            const token = jwt.sign(
                {  
                   id: result[0].usuario_id,
                   rol: "admin"
                },
                "ayd1p1"
            );
            result[0].token = token;
            result[0].rol = "1";

            res.status(200).json(result[0]);
        }
    );



}

module.exports = {
    loginAdmin
}