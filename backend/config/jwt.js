// config/jwt.js
module.exports = {
  secret: process.env.JWT_SECRET, // Adicione no arquivo .env
  expiresIn: '1h',
};
