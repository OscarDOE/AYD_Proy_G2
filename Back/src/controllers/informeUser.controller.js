const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const informeUser = async (req, res) => {
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
        const clientes = await query("SELECT * FROM cliente;", []);
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

const totalUser = async (req, res) => {
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
        const clientes = await query("SELECT COUNT(*) AS total FROM cliente", []);
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

const top5Deliverys = async (req, res) => {
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
        let query1 = "SELECT nombres, apellidos, email, departamento, calificacion ";
        query1 +=  "FROM repartidor ";
        query1 +=  "ORDER BY calificacion DESC ";
        query1 +=  "LIMIT 5;";

        const repartidor = await query(query1, []);
        res.status(200).json(repartidor);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay repartidores para el top",
            },
            auth: false,
            message:
                "No hay repartidores para el top",
        });
    }

}

const top5Empresas = async (req, res) => {
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
        let query1 = "select loka.nombre, loka.usuario_id, count(loka.id) as pedidos from ( "
        query1 += "select distinct empresa.usuario_id, pedido.id, empresa.nombre from empresa, menu, producto, detalle_pedido, pedido "
        query1 += "where empresa.usuario_id = menu.empresa_usuario_id and "
        query1 += "menu.id = producto.menu_id and "
        query1 += "producto.id = detalle_pedido.producto_id  and "
        query1 += "detalle_pedido.pedido_id = pedido.id) as loka "
        query1 += "group by loka.usuario_id "
        query1 += "ORDER BY pedidos DESC "
        query1 += "LIMIT 5;"

        const empresa = await query(query1, []);
        res.status(200).json(empresa);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay empresas para el top",
            },
            auth: false,
            message:
                "No hay empresas para el top",
        });
    }

}

const top5Productos = async (req, res) => {
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
        let query1 = "SELECT d.producto_id as id , pr.nombre, COUNT(*) AS pedido "
        query1 += "FROM detalle_pedido d "
        query1 += "JOIN producto pr ON d.producto_id = pr.id "
        query1 += "GROUP BY d.producto_id, pr.nombre "
        query1 += "ORDER BY pedido DESC "
        query1 += "LIMIT 5;"

        const producto = await query(query1, []);
        res.status(200).json(producto);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay productos para el top",
            },
            auth: false,
            message:
                "No hay productos para el top",
        });
    }

}

const masVendido = async (req, res) => {
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
        let query1 = "SELECT p.id, p.nombre, COUNT(*) AS total_vendidos FROM producto p "
        query1 += "JOIN detalle_pedido dp ON dp.producto_id = p.id "
        query1 += "JOIN pedido pe ON dp.pedido_id = pe.id "
        query1 += "JOIN menu m ON p.menu_id = m.id "
        query1 += "JOIN empresa e ON m.empresa_usuario_id = e.usuario_id "
        query1 += "WHERE e.usuario_id = ? AND pe.estado_pedido_id = 7 "
        query1 += "GROUP BY p.id, p.nombre "
        query1 += "ORDER BY total_vendidos DESC "
        query1 += "LIMIT 5;"

        const empresa = await query(query1, [id]);
        res.status(200).json(empresa);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay empresas para el top",
            },
            auth: false,
            message:
                "No hay empresas para el top",
        });
    }

}

const historialP = async (req, res) => {
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
        // Obtener data usuarios
        let query1 = "SELECT distinct p.id, p.precio_total, p.fecha_salida FROM pedido p "
        query1 += "JOIN detalle_pedido dp ON p.id = dp.pedido_id " 
        query1 += "JOIN menu m ON m.id = (CASE WHEN dp.combo_id IS NOT NULL THEN (SELECT menu_id FROM combo WHERE id = dp.combo_id) "
        query1 += "                            WHEN dp.producto_id IS NOT NULL THEN (SELECT menu_id FROM producto WHERE id = dp.producto_id) "
        query1 += "                       END) "
        query1 += "JOIN empresa e ON e.usuario_id = m.empresa_usuario_id "
        query1 += "WHERE p.estado_pedido_id = 7 AND e.usuario_id = ?;"

        const producto = await query(query1, [id]);
        res.status(200).json(producto);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No hay historial de pedido",
            },
            auth: false,
            message:
                "No hay historial de pedido",
        });
    }

}







module.exports = {
    informeUser,
    totalUser,
    top5Deliverys,
    top5Empresas,
    top5Productos,
    historialP,
    masVendido
}