const mysqlConnection = require("../../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const AgregarProducto = async (req, res) => {
  const {
    nombre,
    precio,
    foto,
    descripcion,
    espesificaciones,
    categoria
  } = req.body;

  if (!nombre || !precio || !categoria) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "El nombre, precio y categoría del producto son obligatorios",
      },
      message: "El nombre, precio y categoría del producto son obligatorios",
    });
  }

  try {
    // Verificar si el producto ya existe en la base de datos
    const existingProduct = await query(
      "SELECT * FROM producto WHERE nombre = ?",
      [nombre]
    );

    if (existingProduct.length > 0) {
      return res.status(409).json({
        status: "FAILED",
        message: "Error, el producto ya existe",
      });
    }

    // Insertar el nuevo producto en la base de datos
    const insertQuery = `
      INSERT INTO producto(nombre, precio, foto, descripcion, espesificaciones, categoria)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await query(insertQuery, [
      nombre,
      precio,
      foto,
      descripcion,
      espesificaciones,
      categoria,
    ]);

    res.status(200).json({
      status: "OK",
      message: "Producto agregado correctamente",
    });
  } catch (error) {
    console.error("ERROR - AgregarProducto", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al crear producto",
    });
  }
};

const EditarProducto = async (req, res) => {
  const { nombre, nuevoPrecio, nuevaDisponibilidad } = req.body;

  if (!nombre || !nuevoPrecio || !nuevaDisponibilidad) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error:
          "El nombre, nuevo precio y nueva disponibilidad del producto son obligatorios",
      },
      message:
        "El nombre, nuevo precio y nueva disponibilidad del producto son obligatorios",
    });
  }

  try {
    // Verificar si el producto existe en la base de datos
    const existingProduct = await query(
      "SELECT * FROM producto WHERE nombre = ?",
      [nombre]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        status: "FAILED",
        message: "El producto no existe",
      });
    }

    // Actualizar el producto en la base de datos
    const updateQuery = `
      UPDATE producto
      SET precio = ?, disponibilidad = ?
      WHERE nombre = ?
    `;
    await query(updateQuery, [nuevoPrecio, nuevaDisponibilidad, nombre]);

    res.status(200).json({
      status: "OK",
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error("ERROR - EditarProducto", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al editar producto",
    });
  }
};

const EliminarProducto = async (req, res) => {
  const { nombreProducto } = req.body;

  if (!nombreProducto) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "El nombre del producto es obligatorio",
      },
      message: "El nombre del producto es obligatorio",
    });
  }

  try {
    // Verificar si el producto existe en la base de datos
    const existingProduct = await query(
      "SELECT * FROM producto WHERE nombre = ?",
      [nombreProducto]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        status: "FAILED",
        message: "El producto no existe",
      });
    }

    // Eliminar el producto de la base de datos
    const deleteQuery = "DELETE FROM producto WHERE nombre = ?";
    await query(deleteQuery, [nombreProducto]);

    res.status(200).json({
      status: "OK",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("ERROR - EliminarProducto", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al eliminar producto",
    });
  }
};

const RealizarPedido = async (req, res) => {
  const { nombreProducto } = req.body;

  if (!nombreProducto) {
    return res.status(400).json({
      status: "FAILED",
      data: {
        error: "El nombre del producto es obligatorio",
      },
      message: "El nombre del producto es obligatorio",
    });
  }

  try {
    // Verificar si el producto existe en la base de datos
    const existingProduct = await query(
      "SELECT * FROM producto WHERE nombre = ?",
      [nombreProducto]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        status: "FAILED",
        message: "El producto no existe",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Pedido realizado correctamente",
      data: existingProduct[0],
    });
  } catch (error) {
    console.error("ERROR - RealizarPedido", error);

    res.status(500).json({
      status: "FAILED",
      message: "Error al realizar pedido",
    });
  }
};

module.exports = {
  AgregarProducto,
  EditarProducto,
  EliminarProducto,
  RealizarPedido,
};