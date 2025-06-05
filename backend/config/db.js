// config/db.js
const { Sequelize } = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize(process.env.DB_URL);

module.exports = sequelize;
