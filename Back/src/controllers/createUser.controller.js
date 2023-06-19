const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const { configCognito } = require("../config/aws.config");

const createUser = async (req, res) => {
  const {
      username,
      password
    } = req.body;

    if (!nickname || !nombre || !contra)
    return res.status(400).json({
      status: "FAILED",
      data: {
        error:
          "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'nickname', 'nombre', 'contra', 'foto'",
      },
      message:
        "Falta uno de los siguientes parámetros o está vacío en el cuerpo de la solicitud: 'nickname', 'nombre', 'contra', 'foto'",
    });

    try {
      
      const hashContra = crypto.createHash("md5").update(password).digest("hex");

      // Guarda usuario en db
      const dataUsuario = [
        { username, hashContra},
      ];
      // Creo el Usuario
      await query("INSERT INTO usuario SET ?", dataUsuario);

      // Obtener id de Usuario
      const idUser = await query("last_insert_id()", []);

      // Guarda cliente en db
      const dataCliente = [
        { username, hashContra, idUser},
      ];
      // Crear el Cliente
      await query("INSERT INTO cliente SET ?", dataCliente);
+9+
      res.status(200).json({
        status: "OK",
        message: "Usuario creado exitosamente",
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
        message: "Error al registrar usuario",
      });
    }
};

module.exports = {
  createUser
};
