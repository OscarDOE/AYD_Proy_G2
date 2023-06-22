const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const createEmpresa = async (req, res) => {
    const {
        nombre,
        descripcion,
        email,
        departamento,
        municipio,
        imagenes,
        tipo,
        password,
        username
    } = req.body;

    // falta direcciones y pago
    if (!username || !password)
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
            },
            message:
                "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
        });

    try {

        //
        const hashContra = crypto.createHash("md5").update(password).digest("hex");

        // Guarda hoja en S3
        /*const URL = await awsImage.uploadImage(
            "Empresas_image",
            imagen,
            username,
            tipoDoc
        );
        console.log("imageURL", URL);*/

        // Guarda usuario en db
        const dataUsuario = [
            {
                usuario: username,
                password: hashContra
            },
        ];
        // Creo el Usuario
        await query("INSERT INTO usuario SET ?", dataUsuario);

        // Obtener id de Usuario
        const idUser = await query("SELECT MAX(id) as id FROM usuario;", []);

        // Guarda Empresa en db
        const dataEmpresa = [
            {
                nombre,
                descripcion,
                email,
                departamento,
                municipio,
                imagenes,
                tipo_empresa_id: tipo,
                estado: 0,
                usuario_id: idUser[0].id
            },
        ];
        // Crear Empresa
        await query("INSERT INTO empresa SET ?", dataEmpresa);
        +9 +
            res.status(200).json({
                status: "OK",
                message: "Solicitud Empresa enviada con exito",
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
            message: "Error al registrar empresa",
        });
    }
};

module.exports = {
    createEmpresa
};
