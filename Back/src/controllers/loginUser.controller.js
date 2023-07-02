const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
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
        "SELECT u.id, u.usuario, u.password, c.estado, c.cupon, c.email  FROM usuario u JOIN cliente c ON u.id = c.usuario_id WHERE u.usuario = ? AND u.password = ?;",
        [username, hashContra],
        async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error SQL - LoginUser" });
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
                    id: result[0].id,
                    rol: "cliente"
                },
                "ayd1p1"
            );
            result[0].token = token;
            result[0].rol = "2"

            res.status(200).json(result[0]);
        }
    );



}

// DIRECCION 
const setDireccion = async (req, res) => {
    const { id, rol } = req.token

    if (!id || !rol) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No trae Token",
            },
            auth: false,
            message:
                "No trae Token",
        });
    }

    if (rol != "cliente" || rol != "repartidor") {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Token invalido",
            },
            auth: false,
            message:
                "Token invalido",
        });
    }

    const { dep, mun, zona } = req.body
    try {
        if (rol == "cliente") {
            // add direcciones de usuario 
            await query("INSERT INTO direcciones_cliente (departamento, municipio, zona, cliente_usuario_id) VALUES (?,?,?,?);", [dep, mun, zona, id]);
            res.status(200).json({
                status: "OK",
                message: "se agrego direccion correctamente"
            });
        } else {
            // add direcciones de usuario 
            await query("INSERT INTO autorizaciones (departamento, municipio, zona, repartidor_usuario_id, estado) VALUES (?,?,?,?);", [dep, mun, zona, id, 0]);
            res.status(200).json({
                status: "OK",
                message: "se agrego direccion correctamente"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al ingresar direccion",
            },
            auth: false,
            message: "Error al ingresar direccion",
        });
    }

}

// DIRECCION 
const setTarjeta = async (req, res) => {
    const { id, rol } = req.token

    if (!id || !rol) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No trae Token",
            },
            auth: false,
            message:
                "No trae Token",
        });
    }

    if (rol != "cliente") {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Token invalido",
            },
            auth: false,
            message:
                "Token invalido",
        });
    }

    const { num, cvv, emi, ven } = req.body
    try {
        // add direcciones de usuario 
        await query("INSERT INTO  detalle_tarjeta (numero, cvv, cliente_usuario_id ,fecha_emision, fecha_terminacion) VALUES (?,?,?,?,?);", [num, cvv, id, emi, ven]);
        res.status(200).json({
            status: "OK",
            message: "se agrego metodo de pago correctamente"
        });

    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al ingresar metodo de pago",
            },
            auth: false,
            message: "Error al ingresar metodo de pago",
        });
    }

}



module.exports = {
    loginUser,
    setDireccion,
    setTarjeta
}