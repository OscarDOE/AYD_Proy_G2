const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const calificacion = async (req, res) => {
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
    const { idped, cali } = req.body

    try {
        // Poner calificacion
        await query("UPDATE pedido SET calificacion = ? WHERE pedido.id = ? ;", [cali, idped]);
        // obtener id repartidor
        const idrep = await query("SELECT repartidor_usuario_id as id FROM pedido WHERE pedido.id = ? ;", [idped]);
        // calcular promedio
        let query1 = "SELECT AVG(calificacion) AS promedio "
        query1 += "FROM pedido where repartidor_usuario_id = ?;"
        const promedio = await query(query1, [idrep[0].id]);
        // actualizar promedio en repartidor
        await query("UPDATE repartidor SET calificacion = ? WHERE repartidor.usuario_id = ?;", [promedio[0].promedio, idrep[0].id]);
        res.status(200).json({
            status: "OK",
            message: "Se califico correctamente al repartidor"
        });
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

module.exports = {
    calificacion
}