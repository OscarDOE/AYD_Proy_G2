const {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} = require("amazon-cognito-identity-js");
const mysqlConnection = require("../database/db");
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const awsImage = require("../functions/awsImage");
const crypto = require("crypto");

const { configCognito } = require("../config/aws.config");
const coginito = new CognitoUserPool(configCognito);

const createRepar = async (req, res) => {
  const {
      nombre, 
      apellidos, 
      correo, 
      telefono, 
      departamento, 
      municipio,
      licencia,
      tipo,
      transporte,
      hoja
    } = req.body;

};

module.exports = {
  createUser
};
