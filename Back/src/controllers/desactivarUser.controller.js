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
        const clientes = await query("SELECT * FROM cliente WHERE estado = 1;", []);
        res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay clientes",
            },
            auth: false,
            message:
                "No hay clientes",
        });
    }

}

const desactivarEmpr = async (req, res) => {
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
        const clientes = await query("SELECT usuario_id, nombre, email FROM empresa WHERE estado = 1;", []);
        res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay empresas",
            },
            auth: false,
            message:
                "No hay empresas",
        });
    }

}

const desactivarRepr = async (req, res) => {
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
        const clientes = await query("SELECT usuario_id, nombres, email FROM repartidor WHERE estado = 1;", []);
        res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay repartidores",
            },
            auth: false,
            message:
                "No hay repartidores",
        });
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

const resDesactivarE = async (req, res) => {
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
                    "Los datos de empresa son necesarios",
            },
            auth: false,
            message:
                "Los datos de empresa son necesarios",
        });
    }

    try {
        // Obtener data empresa  
        await query("UPDATE empresa SET estado = ? WHERE usuario_id = ?;", [2, idUser]);
        return res.status(200).json({
            status: "OK",
            message:
                "Se desactivo la empresa correctamente",
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

const resDesactivarR = async (req, res) => {
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
                    "Los datos de empresa son necesarios",
            },
            auth: false,
            message:
                "Los datos de empresa son necesarios",
        });
    }

    try {
        // Obtener data repartidor  
        await query("UPDATE repartidor SET estado = ? WHERE usuario_id = ?;", [2, idUser]);
        return res.status(200).json({
            status: "OK",
            message:
                "Se desactivo el repartidor correctamente",
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
    desactivarEmpr,
    desactivarRepr,
    resDesactivarU,
    resDesactivarE,
    resDesactivarR
}