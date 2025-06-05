// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const { User } = require('../models');
const winston = require('../logs/logger');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    winston.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
};
