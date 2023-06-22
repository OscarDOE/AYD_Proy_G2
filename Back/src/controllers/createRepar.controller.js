const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");
const awsImage = require("../functions/awsImage");

const createRepar = async (req, res) => {
    const {
        nombres,
        apellidos,
        correo,
        telefono,
        departamento,
        municipio,
        transporte,
        hoja_vida,
        tipoDoc,
        nit,
        password
    } = req.body;

    // falta direcciones y pago
    if (!correo || !password)
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'correo', 'password'",
            },
            message:
                "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'correo', 'password'",
        });

    try {

        //
        const hashContra = crypto.createHash("md5").update(password).digest("hex");

        // Guarda usuario en db
        const dataUsuario = [
            {
                usuario: correo,
                password: hashContra
            },
        ];
        // Creo el Usuario
        await query("INSERT INTO usuario SET ?", dataUsuario);

        // Obtener id de Usuario
        const idUser = await query("SELECT MAX(id) as id FROM usuario;", []);

        // Guarda hoja en S3
        const URL = await awsImage.uploadImage(
            "Repartidores",
            hoja_vida,
            idUser[0].id,
            tipoDoc
        );
        console.log("imageURL", URL);

        // Guarda cliente en db
        const dataCliente = [
            {
                nombres,
                apellidos,
                email: correo,
                telefono,
                departamento,
                municipio,
                transporte,
                hoja_vida:URL,
                nit,
                estado: 0,
                calificacion: 0,
                usuario_id: idUser[0].id
            },
        ];
        // Crear el Cliente
        await query("INSERT INTO repartidor SET ?", dataCliente);
        +9 +
            res.status(200).json({
                status: "OK",
                message: "Solicitud Repartidor enviada con exito",
            });
    } catch (error) {
        console.error("ERROR - createUser", error);

        if (error.code == "ER_DUP_ENTRY")
            return res.status(500).json({
                status: "FAILED",
                message: "Error, el nombre de usuario ya existe",
            });

        res.status(500).json({
            status: "FAILED",
            message: "Error al registrar repartidor",
        });
    }
};

module.exports = {
    createRepar
};
