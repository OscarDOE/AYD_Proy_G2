const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const AgregarTipoProducto = async (req, res) => {
  const {
    nombre,
    id_empresa,
  } = req.body;
  console.log(req.body)

  if (!nombre || !id_empresa) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "El nombre y id_empresa son obligatorios",
      },
      message: "El nombre y id_empresa son obligatorios",
    });
  }

  try {
    // Insertar el nuevo producto en la base de datos
    const insertQuery = `
      INSERT INTO tipo_producto(descripcion, empresa_usuario_id)
      VALUES (?, ?)
    `;
    await query(insertQuery, [
      nombre,
      id_empresa,
    ]);
    res.status(200).json({
      status: "OK",
      message: "Tipo de Producto agregado correctamente",
    });
  } catch (error) {
    console.error("ERROR - Agregar Tipo Producto", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al crear tipo de producto",
    });
  }
};

const ObtenerTipoProductos = async (req, res) => {
  const {
    empresa_id
  } = req.body;
  try {
    // Obtener todos los productos de la base de datos
    const productos = await query(`SELECT * FROM tipo_producto  where empresa_usuario_id = ${empresa_id}`);

    res.status(200).json({
      status: "OK",
      data: productos,
    });
  } catch (error) {
    console.error("ERROR - ObtenerTipoProductos", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al obtener los tipos de productos productos",
    });
  }
};

module.exports = {
    AgregarTipoProducto,
    ObtenerTipoProductos,
};