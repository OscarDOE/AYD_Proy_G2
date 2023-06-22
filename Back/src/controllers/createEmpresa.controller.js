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
        zona,
        imagenes,
        tipo,
        password
    } = req.body;

    
    if (!password || !email)
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
            },
            message:
                "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'username', 'password'",
        });

    // validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)){
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "El correo no es valido",
            },
            message:
                "El correo no es valido",
        });
    }

    try {
        //
        const hashContra = crypto.createHash("md5").update(password).digest("hex");

        // Guarda usuario en db
        const dataUsuario = [
            {
                usuario: email,
                password: hashContra
            },
        ];
        // Creo el Usuario
        await query("INSERT INTO usuario SET ?", dataUsuario);

        // Obtener id de Usuario
        const idUser = await query("SELECT MAX(id) as id FROM usuario;", []);

        // Guarda hoja en S3
        const URL = await awsImage.uploadImage(
            "Empresas_image",
            imagenes,
            idUser[0].id,
            "pdf"
        );
        console.log("imageURL", URL);

        // Guarda Empresa en db
        const dataEmpresa = [
            {
                nombre,
                descripcion,
                email,
                departamento,
                municipio,
                zona,
                imagenes: URL,
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
