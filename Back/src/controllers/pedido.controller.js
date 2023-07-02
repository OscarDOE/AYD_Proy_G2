const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");


// PEDIR DE UNA TODO
const pedirProducto = async (req, res) => {
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

    const { productos, dir, tar, cupon } = req.body
    try {
        // Obtener la fecha y hora actual
        const fechaHora = new Date();
        // Formatear la fecha y hora en formato ISO 8601 compatible con MySQL
        const fechaHoraMySQL = fechaHora.toISOString().slice(0, 19).replace('T', ' ');
        // Crea el carrito
        await query("INSERT INTO pedido (cliente_usuario_id, estado_pedido_id, fecha_salida, direcciones_cliente_id, detalle_tarjeta_id) VALUES (?, ?, ?, ?, ?);", [id, 2, fechaHoraMySQL, dir, tar]);
        // Obtiene el id de carrito
        const idPedido = await query("SELECT MAX(id) as id FROM pedido;", []);
        // Total
        let total_pedido = 0;
        // For para pasar por producto o xombo
        productos.forEach(async function (objeto) {
            // For para ingresar la cantidad de cada prodicto o combo
            for (let i = 0; i < objeto.cantidad; i++) {
                // Agrega el producto al carrito
                mysqlConnection.query(
                    `INSERT INTO detalle_pedido (pedido_id, ${objeto.tipo}) VALUES (?, ?);`,
                    [idPedido[0].id, objeto.id],
                    async (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ message: "Error SQL - LoginUser" });
                        }
                    }
                );
            }
            total_pedido += objeto.subtotal
        }); 

        // Guarda el precio total del pedido
        /*let precio = "SELECT SUM(IFNULL(pr.precio, 0) + IFNULL(c.precio, 0)) AS precio "
        precio += "FROM detalle_pedido p "
        precio += "LEFT JOIN producto pr ON p.producto_id = pr.id "
        precio += "LEFT JOIN combo c ON p.combo_id = c.id "
        precio += "WHERE p.pedido_id = ? ;"*/
        // const total = await query(precio, [idPedido[0].id]);

        // Verifica si ocupa el cupon
        if (cupon!="") {
            // agregar el total al pedido - 15%
            let addPr = "UPDATE pedido SET precio_total = ? WHERE id = ?;"
            await query(addPr, [(total_pedido)*0.15, idPedido[0].id]);
            // actualiza usuario
            let upCupon = "UPDATE cliente SET cupon = 0 WHERE usuario_id = ?;"
            await query(upCupon,[id])
        } else {
            // agregar el total al pedido
            let addPr = "UPDATE pedido SET precio_total = ? WHERE id = ?;"
            await query(addPr, [total_pedido, idPedido[0].id]);
        }
        
        res.status(200).json({
            status: "OK",
            message: "El pedido fue agregado correctamente"
        });

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

// SE MUESTRA EMPRESAS
const getEmpresas = async (req, res) => {
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

    try {
        // Obtiene las empresas
        //const empresas = await query("SELECT e.nombre, t.descripcion FROM empresa e INNER JOIN tipo_empresa t ON e.tipo_empresa_id = t.id;", []);
        const empresas = await query("SELECT e.usuario_id, e.nombre, e.imagenes, e.descripcion FROM empresa e INNER JOIN tipo_empresa t ON e.tipo_empresa_id = t.id;", []);
        res.status(200).json(empresas);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al mostrar empresas",
            },
            auth: false,
            message: "Error al mostrar empresas",
        });
    }

}

// SE MUESTRA PRODUCTOS
const getMenu = async (req, res) => {
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
    const { idEmp } = req.body
    try {
        // Obtiene las empresas
        let query1 = "SELECT c.id AS id, c.nombre AS nombre, c.precio AS precio, c.imagen as imagen, c.descripcion as descripcion, 'combo_id' AS tipo "
        query1 += "FROM empresa e "
        query1 += "LEFT JOIN menu m ON e.usuario_id = m.empresa_usuario_id "
        query1 += "LEFT JOIN combo c ON m.id = c.menu_id "
        query1 += "WHERE e.usuario_id = ? "
        query1 += "UNION "
        query1 += "SELECT p.id AS producto_id, p.nombre AS producto_nombre, p.precio AS producto_precio, p.imagen as imagen, p.descripcion as descripcion, 'producto_id' AS tipo "
        query1 += "FROM empresa e "
        query1 += "LEFT JOIN menu m ON e.usuario_id = m.empresa_usuario_id "
        query1 += "LEFT JOIN producto p ON m.id = p.menu_id "
        query1 += "WHERE e.usuario_id = ?;"
        const menu = await query(query1, [idEmp,idEmp]);
        res.status(200).json(menu);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al mostrar empresas",
            },
            auth: false,
            message: "Error al mostrar empresas",
        });
    }

}

// SE MUESTRA CATEGORIAS
const getCategorias = async (req, res) => {
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
    const { idEmp } = req.body
    try {
        // Obtiene las empresas
        const empresas = await query("SELECT id, descripcion FROM tipo_producto WHERE empresa_usuario_id = ?;", [idEmp]);
        res.status(200).json(empresas);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al mostrar empresas",
            },
            auth: false,
            message: "Error al mostrar empresas",
        });
    }

}

// PRODUCTOS CON FILTRO
const getProducto = async (req, res) => {
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

    const { filtro, idEmp } = req.body

    try {
        // Obtiene las empresas
        let filtrado = "SELECT p.id AS id, p.nombre AS nombre, p.precio AS precio, p.descripcion AS descripcion, p.imagen AS imagen "
        filtrado += "FROM producto p "
        filtrado += "INNER JOIN menu m ON p.menu_id = m.id "
        filtrado += "INNER JOIN tipo_producto tp ON p.tipo_producto_id = tp.id "
        filtrado += "WHERE tp.descripcion = ?;"
        const empresas = await query(filtrado, [filtro]);
        res.status(200).json(empresas);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Error al mostrar empresas",
            },
            auth: false,
            message: "Error al mostrar empresas",
        });
    }

} 

// HISTORIAL PEDIDO
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

    try {
        // Obtener data pedidos
        const pedidos = await query("SELECT * FROM pedido WHERE cliente_usuario_id = ?;", [id]);
        // Obtener data producto 
        res.status(200).json(pedidos);
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No se encontro el repartidor",
            },
            auth: false,
            message:
                "No se encontro el repartidor",
        });
    }

}

// DIRECCION
const direccion = async (req, res) => {
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

    try {   
        // Obtiene direcciones de usuario 
        const direccion = await query("SELECT * FROM direcciones_cliente WHERE cliente_usuario_id = ?;", [id]);
        res.status(200).json(direccion);

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
// PAGO 
const tarjeta = async (req, res) => {
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

    try {
        // Obtiene direcciones de usuario 
        const direccion = await query("SELECT * FROM detalle_tarjeta WHERE cliente_usuario_id = ?;", [id]);
        res.status(200).json(direccion);
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


module.exports = {
    pedirProducto,
    getEmpresas,
    getMenu,
    getCategorias,
    getProducto,
    historialPedido,
    direccion,
    tarjeta
}