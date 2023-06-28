const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const awsImage = require("../functions/awsImage");
const fs = require('fs/promises')

const NuevoCombo = async (req, res) => {
    //nombre-descripcion,id_empresa,precio,estado,[id_producto]
    const {
        nombre,//
        descripcion,//
        id_empresa,//
        precio,//tipo numero
        estado,
        id_productos,
    } = req.body;
    console.log(req.body)

    console.log(req.file.path)
    const filePath = req.file.path
    const fileBase64 = (await fs.readFile(filePath)).toString('base64')

    if (!nombre || !descripcion || !id_empresa || !precio || !estado || (id_productos.length() < 0)) {
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
        const URL = await awsImage.uploadImage(
            "Empresa_combo",
            fileBase64,
            menu_id + nombre,
            "png"
        );
        console.log(URL)
        const menu_id = await query(`SELECT menu.id FROM menu where menu.empresa_usuario_id = ${id_empresa}`);
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
            estado,
        ]);
        //obtener el indice del nuevo combo
        const id_combo = await query(`SELECT max(id) FROM combo`);
        // Insertar el detalle_combo
        id_productos.forEach(async id_producto => {
            const insertQuery = `
                INSERT INTO detalle_combo(combo_id,catalogo_id)
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

module.exports = {
    NuevoCombo
};