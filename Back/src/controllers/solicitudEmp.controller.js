const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const solicitudEmp = async (req, res) => {
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
        // Obtener data empresas
        const empresa = await query("SELECT * FROM empresa WHERE estado = 0;", []);

        res.status(200).json(empresa);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay empresas pendientes",
            },
            auth: false,
            message:
                "No hay empresas pendientes",
        });
    }

}

const respuestaEmp = async (req, res) => {

    const { idUser,  resp} = req.body

    if (!idUser || !resp) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Los datos de empresa y respuesta son necesarios",
            },
            auth: false,
            message:
                "Los datos de empresa y respuesta son necesarios",
        });
    }

    try {
        // Obtener data repartidores  
        await query("UPDATE empresa SET estado = ? WHERE usuario_id = ?;", [resp, idUser]);
        return res.status(200).json({
            status: "OK",
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
    solicitudEmp,
    respuestaEmp
}