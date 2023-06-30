const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const historialPedido = async (req, res) => {
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

    if (rol != "repartidor") {
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
        const pedidos = await query("SELECT * FROM pedidos WHERE repartidor_usuario_id = ? ;", [id]);
        res.status(200).json(pedidos);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay pedidos del repartidor",
            },
            auth: false,
            message:
                "No hay pedidos del repartidor",
        });
    }

}

const comisiones = async (req, res) => {
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
        let query1 = "SELECT SUM(p.precio * 0.05) AS comisiones "
        query1 += "FROM pedido p "
        query1 += "JOIN repartidor r ON p.repartidor_usuario_id = ?; "

        const comisiones = await query(query1, [id]);
        res.status(200).json(comisiones);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay comisiones",
            },
            auth: false,
            message:
                "No hay comisiones",
        });
    }

}


module.exports = {
    historialPedido,
    comisiones
}