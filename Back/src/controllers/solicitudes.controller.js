const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");

const solicitudes = async (req, res) => {
    const { id, rol} = req.token
    
    if (!id || !rol){
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "No trae Token",
            },
            auth: false,
            message:
                "No trae Token",
        });
    }
        
    if (rol != "admin") {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error:
                    "Token invalido",
            },
            auth: false,
            message:
                "Token invalido",
        });
    }
    // Obtener data repartidores  
    const repartidor = await query("SELECT * FROM repartidor WHERE estado = 0;", []);
    // Obtener data empresas
    const empresa = await query("SELECT * FROM empresa WHERE estado = 0;", []);

    const result = {repartidor, empresa}
    res.status(200).json(result);
}

module.exports = {
    solicitudes
}