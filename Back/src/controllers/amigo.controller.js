const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const createSolicitudAmistad = async (req, res) => {
    const {idUsuario, idAmigo} = req.body
    console.log(idUsuario, idAmigo)

}

module.exports = {
    createSolicitudAmistad
}