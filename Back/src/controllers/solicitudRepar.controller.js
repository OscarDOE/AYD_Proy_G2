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

    const { idUser, resp } = req.body

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
        console.log("RERERERER")
        console.log(resp)
        console.log("ERERERERE")
        console.log(idUser)
        await query("UPDATE repartidor SET estado = ? WHERE usuario_id = ?;", [resp, idUser]);
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

const solicitudCambio = async (req, res) => {
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
        let query1 = "SELECT a.*, r.nombres AS repartidor FROM autorizacion a JOIN repartidor r ON a.repartidor_usuario_id = r.usuario_id WHERE a.estado = 0;"
        const repartidor = await query(query1, []);
        res.status(200).json(repartidor);
    } catch (error) {

    }

}

const respuestaCambio = async (req, res) => {
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

    const { idaut, estado } = req.body

    if (!idaut || !estado) {
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
        // aprobada
        if (estado == 1) {
            // id rep
            const aut = await query("SELECT *  FROM autorizacion WHERE id = ?", [idaut])
            // Obtener data repartidores  
            await query("UPDATE repartidor SET departamento = ?, municipio = ?, zona = ? WHERE usuario_id = ?;", [aut[0].departamento, aut[0].municipio, aut[0].zona, aut[0].repartidor_usuario_id]);
            // Obtener data repartidores  
            await query("UPDATE autorizacion SET estado = 1 WHERE id = ?;", [idaut]);
        }else{
            // Obtener data repartidores  
            await query("UPDATE autorizacion SET estado = 2 WHERE id = ?;", [idaut]);
        }
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
    solicitudRepar,
    respuestaRepar,
    solicitudCambio,
    respuestaCambio
}