const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const solicitudRepar = async (req, res) => {
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
        // Obtener data repartidores  
        const repartidor = await query("SELECT * FROM repartidor WHERE estado = 0;", []);
        res.status(200).json(repartidor);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay repartidores pendientes",
            },
            auth: false,
            message:
                "No hay repartidores pendientes",
        });
    }

}

const respuestaRepar = async (req, res) => {
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

    const { idUser,  resp} = req.body

    if (!idUser || !resp) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Los datos de usuario y respuesta son necesarios",
            },
            auth: false,
            message:
                "Los datos de usuario y respuesta son necesarios",
        });
    }

    try {
        // Obtener data repartidores  
        await query("UPDATE repartidor SET estado = ? WHERE usuario_id = ?;", [idUser, resp]);
        return res.status(200).json({
            status: "SUCCESS",
            data: {
                error:
                    "Se actualizo el estado correctamente",
            },
            auth: false,
            message:
                "Se actualizo el estado correctamente",
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
    solicitudRepar,
    respuestaRepar
}