const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const loginRepar = async (req, res) => {
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

    // id de usuario
    const idUser = await query("SELECT * FROM usuario WHERE usuario = ?;", [username]);

    // verifica que exista el usuario
    if (idUser[0].password != hashContra) {
        return res
            .status(401)
            .json({
                status: "FAILED",
                auth: false,
                message: "Credenciales inválidas",
            });
    }
    // busco repartidor
    const dataRepar = await query("SELECT * FROM repartidor WHERE usuario_id = ?;", [idUser[0].id]);

    // verificar estado de solicitud
    if (dataRepar[0].estado == 0) { // pendiente
        return res
            .status(401)
            .json({
                status: "FAILED",
                auth: false,
                message: "Solicitud pendiente de revisar",
            });
    } else if (dataRepar[0].estado == 0) { //rechazada
        return res
            .status(401)
            .json({
                status: "FAILED",
                auth: false,
                message: "Solicitud Rechazada",
            });
    } else { // aprobada
        //Si los datos son correctos se genera el token
        const token = jwt.sign(
            {  
               id: idUser[0].id,
               rol: "empresa"
            },
            "ayd1p1"
        );
        dataRepar[0].token = token;
        return res.status(200).json(dataRepar[0]);
    }
}

module.exports = {
    loginRepar
}