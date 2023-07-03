const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const solicitudEmp = async (req, res) => {
    const { id, rol } = req.token
    console.log("SOLICITUD ", req.token)
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

    }

}

const respuestaEmp = async (req, res) => {
    const { id, rol } = req.token
    console.log("AAAAAAAAAAAAAAAAAAA")
    console.log(req.token)

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

const solicitudPed = async (req, res) => {
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

    if (rol != "empresa") {
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

        let query1 = "SELECT distinct p.id, p.precio_total, p.fecha_salida FROM pedido p "
        query1 += "JOIN detalle_pedido dp ON p.id = dp.pedido_id "
        query1 += "JOIN menu m ON m.id = (CASE WHEN dp.combo_id IS NOT NULL THEN (SELECT menu_id FROM combo WHERE id = dp.combo_id) "
        query1 += "WHEN dp.producto_id IS NOT NULL THEN (SELECT menu_id FROM producto WHERE id = dp.producto_id)END) "
        query1 += "JOIN empresa e ON e.usuario_id = m.empresa_usuario_id "
        query1 += "WHERE p.estado_pedido_id = 2 AND e.usuario_id = ?; "
        // Obtener data empresas
        const empresa = await query(query1, [id]);
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

const respuestaPed = async (req, res) => {
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

    if (rol != "empresa") {
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

    const { idped} = req.body

    if (!idped) {
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
        // Obtener data repartidores  
        await query("UPDATE pedido SET estado_pedido_id = 4 WHERE id = ?;", [idped]);
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
    respuestaEmp,
    solicitudPed,
    respuestaPed
}