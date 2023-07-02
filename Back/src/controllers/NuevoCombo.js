const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const awsImage = require("../functions/awsImage");
const fs = require('fs/promises')

const NuevoCombo = async (req, res) => {
    //nombre-descripcion,id_empresa,precio,estado,[id_producto]
    let {
        nombre,//
        precio,//tipo numero
        descripcion,//
        estado,
        id_empresa,//
        id_productos,
    } = req.body;
    console.log(req.body)

    console.log(req.file.path)
    const filePath = req.file.path
    const fileBase64 = (await fs.readFile(filePath)).toString('base64')

    if (!nombre || !descripcion || !id_empresa || !precio || !estado || (id_productos.split(',') > 0)) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error: "Todos los campos son obligatorios",
            },
            message: "Favor de llenar todos los campos nombre-descripcion,id_empresa,precio,estado,[id_producto]",
        });
    }
    
    try {

        // Guarda hoja en S3
        console.log("VVVVVVVVVVVVVVVVVVV")
        console.log(id_empresa)
        let menu_id = await query(`SELECT menu.id FROM menu where menu.empresa_usuario_id = ${id_empresa}`);
        menu_id = menu_id[0].id
        console.log(menu_id)
        const URL = await awsImage.uploadImage(
            "Empresa_combo",
            fileBase64,
            menu_id + nombre,
            "png"
        );
        console.log(URL)
        
        //Insertar el nuevo combo
        const insertQueryCombo = `
        INSERT INTO combo(nombre,descripcion,menu_id,precio,estado)
        VALUES (?,?,?,?,?)
        `;
        await query(insertQueryCombo, [
            nombre,
            descripcion,
            menu_id,
            precio,
            estado
        ]);
        //obtener el indice del nuevo combo
        let id_combo = await query(`SELECT max(id) as id FROM combo`);
        id_combo = id_combo[0].id;
        
        // Insertar el detalle_combo
        id_productos = id_productos.split(',')
        id_productos.forEach(async id_producto => {
            const insertQuery = `
                INSERT INTO detalle_combo(combo_id,producto_id)
                VALUES (?, ?)
                `;
            await query(insertQuery, [
                id_combo,
                id_producto,
            ]);
        });
        res.status(200).json({
            status: "OK",
            message: "Combo agregado correctamente",
        });
    } catch (error) {
        console.error("ERROR - NuevoCombo", error);

        res.status(500).json({
            status: "FAILED",
            message: "Error al crear Combo",
        });
    }
};

const ObtenerCombos = async (req, res) => {
    const {
      menu_id
    } = req.body;
    try {
      // Obtener todos los productos de la base de datos
      let menu_id_ = await query(`SELECT menu.id FROM menu where menu.empresa_usuario_id = ${menu_id}`);
        menu_id_ = menu_id_[0].id
      const productos = await query(`SELECT * FROM combo where menu_id = ${menu_id_}`);
  
      res.status(200).json({
        status: "OK",
        data: productos,
      });
    } catch (error) {
      console.error("ERROR - ObtenerCombos", error);
  
      res.status(500).json({
        status: "FAILED",
        message: "Error al obtener los Combos",
      });
    }
  };

module.exports = {
    NuevoCombo,
    ObtenerCombos
};