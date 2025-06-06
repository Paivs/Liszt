// config/swagger.js
require('dotenv').config();

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Liszt API',
      version: '1.0.0',
      description: 'API para gerenciamento de psicoterapeutas, pacientes, diários e sessões.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api-docs`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rotas onde as anotações do Swagger serão encontradas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
