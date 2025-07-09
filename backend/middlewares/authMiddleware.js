const jwt = require('jsonwebtoken');
const { User, Patient } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Acesso não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const usuario = await User.findByPk(decoded.id);
    

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    let perfilInfo = null;

    if (usuario.role === 'patient') {
      perfilInfo = await Patient.findOne({ where: { user_id: usuario.id } });
    } else if (usuario.role === 'therapist') {
      // perfilInfo = await Therapist.findOne({ where: { usuario_id: usuario.id } });
      perfilInfo = {  }
    } else if (usuario.role === 'admin') {
      // perfilInfo = await Admin.findOne({ where: { usuario_id: usuario.id } });
      perfilInfo = {  }

    }else{
      throw new Error("Erro interno ao validar o usuário")
    }

    req.user = {
      ...usuario.toJSON(),
      perfilInfo,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
