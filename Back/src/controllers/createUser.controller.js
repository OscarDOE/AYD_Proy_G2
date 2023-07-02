const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const createUser = async (req, res) => {
  const {
      username,
      password,
      correo
    } = req.body;

    // falta direcciones y pago
    if (!username || !password || !correo)
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

      // Guarda cliente en db
      const dataCliente = [
        { 
          estado: 1, 
          cupon: 1,
          email: correo,
          usuario_id: idUser[0].id
        },
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
