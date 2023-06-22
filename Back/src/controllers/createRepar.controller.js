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
        licencia,
        transporte,
        hoja_vida,
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

    
    // validar telefono
    const regexNum = /^\d{8}$/;
    if (!regexNum.test(correo)){
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "El telefono no es valido",
            },
            message:
                "El telefono no es valido",
        });
    }

    // validar Nit
    const regexNit = /^\d{9}$/;
    if (!regexNit.test(correo)){
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "El NIT no es valido",
            },
            message:
                "El NIT no es valido",
        });
    }


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
            "pdf"
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

        // verificarLicencia
        let tipoL = 0
        switch (licencia) {
            case "A":
                tipoL = 1;
                break;
            case "B":
                tipoL = 2;
                break;
            case "C":
                tipoL = 3;
                break;
            case "M":
                tipoL = 4;
                break;
            default:
                tipoL = 1;
                break;
        }
        // Guarda Licencia en db
        const dataLicencia = [
            {
                tipo_licencia_id: tipoL,
                repartidor_usuario_id: idUser[0].id
            },
        ];

        // Detalle Licencia
        await query("INSERT INTO detalle_licencia SET ?", dataLicencia);

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
