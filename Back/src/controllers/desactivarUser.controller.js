const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const desactivarUser = async (req, res) => {
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

    if (rol != "admin") {
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
    try {
        // Obtener data usuarios
        let query1 = "SELECT u.id, u.usuario, u.password FROM usuario u "
        query1 += "JOIN cliente c ON u.id = c.usuario_id "
        query1 += "WHERE c.estado = 1;"

        const clientes = await query(query1, []);
        res.status(200).json(clientes);
    } catch (error) {
        
    }

}

const resDesactivarU = async (req, res) => {
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

    if (rol != "admin") {
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

    const { idUser} = req.body
    if (!idUser) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Los datos de usuario son necesarios",
            },
            auth: false,
            message:
                "Los datos de usuario son necesarios",
        });
    }

    try {
        // Obtener data usuario  
        await query("UPDATE cliente SET estado = 2 WHERE usuario_id = ?;", [idUser]);
        return res.status(200).json({
            status: "OK",
            message:
                "Se deshabilito correctamente",
        });
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No se envio la respuesta a la solicitud correctamente",
            },
            auth: false,
            message:
                "No se envio la respuesta a la solicitud correctamente",
        });
    }

}

module.exports = {
    desactivarUser,
    resDesactivarU,
}