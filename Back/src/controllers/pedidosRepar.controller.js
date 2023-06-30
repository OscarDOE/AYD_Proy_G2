const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");


// PEDIDO ACTUAL
const pedidoActual = async (req, res) => {
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
        // Obtiene data de pedido
        const pedido = await query("SELECT * FROM pedido WHERE repartidor_usuario_id = ? and estado = ?;", [id, 3]);
        res.status(200).json(pedido);

    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al pedir",
            },
            auth: false,
            message: "Error al pedir",
        });
    }

}

// FINALIZAR PEDIDO 
const finPedido = async (req, res) => {
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
        // Cambia el estado del pedido que tiene el repartidor
        await query(" UPDATE pedido SET estado = ? WHERE repartidor_usuario_id = ? and estado = 3;", [id]);
        res.status(200).json({
            status: "OK",
            message: "Se ha entregado pedido"
        });

    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al finalizar pedido",
            },
            auth: false,
            message: "Error al finalizar pedido",
        });
    }

}

// VISUALIZACION DE PEDIDOS
const verPedidos = async (req, res) => {
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
        // Obtiene los pedidos que puede aceptar el repartidor
        const query1 = " SELECT p.* FROM pedido p JOIN direcciones_cliente dc ON p.direcciones_cliente_id = dc.id " 
        query1 += "JOIN repartidor r ON dc.departamento = r.departamento "
        query1 += "WHERE p.estado = 0; "

        const pedidos = await query(query1, []);
        res.status(200).json(pedidos);

    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al mostrar pedidos",
            },
            auth: false,
            message: "Error al mostrar pedidos",
        });
    }

}

// SELECCIONAR PEDIDO
const selectPedido = async (req, res) => {
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

    const {idPed} = req.body
    try {
        // Cambia el estado del pedido que tiene el repartidor
        await query(" UPDATE pedido SET estado = 2 WHERE pedido = ?;", [idPed]);
        res.status(200).json({
            status: "OK",
            message: "Seleccion de pedido correcta"
        });

    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al seleccionar pedido",
            },
            auth: false,
            message: "Error al seleccionar pedido",
        });
    }

}


module.exports = {
    pedirProducto,
    getEmpresas,
    getMenu,
    getCategorias,
    getProducto,
    historialPedido
}