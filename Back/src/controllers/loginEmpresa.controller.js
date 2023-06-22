const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const loginEmpresa = async (req, res) => {
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

    try {
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
    } catch (error) {
        return res
            .status(401)
            .json({
                status: "FAILED",
                auth: false,
                message: "Credenciales inválidas",
            });
    }


    // busco empresa
    const dataEmp = await query("SELECT * FROM empresa WHERE usuario_id = ?;", [idUser[0].id]);

    try {
        // verificar estado de solicitud
        if (dataEmp[0].estado == 0) { // pendiente
            return res
                .status(401)
                .json({
                    status: "FAILED",
                    auth: false,
                    message: "Solicitud pendiente de revisar",
                });
        } else if (dataEmp[0].estado == 2) { //rechazada
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
            dataEmp[0].token = token;
            dataEmp[0].rol = "4"
            return res.status(200).json(dataEmp[0]);

        }
    } catch (error) {
        return res
            .status(401)
            .json({
                status: "FAILED",
                auth: false,
                message: "Credenciales inválidas",
            });
    }
}

module.exports = {
    loginEmpresa
}