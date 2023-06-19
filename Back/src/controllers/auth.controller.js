const {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} = require("amazon-cognito-identity-js");
const mysqlConnection = require("../database/db");
const awsImage = require("../functions/awsImage");
const { configCognito } = require("../config/aws.config");
const coginito = new CognitoUserPool(configCognito);
const util = require("util");
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { nickname, contra } = req.body;
};

module.exports = {
  login,
};
