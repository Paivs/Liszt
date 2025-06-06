// app.js
const express = require('express');
const winston = require('./logs/logger');
const { sequelize } = require('./models');
const routes = require('./routes');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors())

// Middleware para requisições JSON
app.use(express.json());

// Usando as rotas da API
app.use('/api', routes);

// docs
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Conectar ao banco de dados e iniciar o servidor
app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta ' + process.env.PORT);
});

module.exports = app;
