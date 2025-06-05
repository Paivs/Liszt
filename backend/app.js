// app.js
const express = require('express');
const winston = require('./logs/logger');
const { sequelize } = require('./models');
const routes = require('./routes');
const swaggerDocs = require('./config/swagger');
require('dotenv').config();

const app = express();

// Middleware para requisições JSON
app.use(express.json());

// Usando as rotas da API
app.use('/api', routes);

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conectar ao banco de dados e iniciar o servidor
sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        winston.info(`Servidor rodando na porta ${process.env.PORT}`);
    });
});

module.exports = app;
