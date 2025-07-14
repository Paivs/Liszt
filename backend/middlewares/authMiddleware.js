const jwt = require("jsonwebtoken");
const { User, Patient, Therapist, Admin } = require("../models");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    let perfilInfo = null;

    if (usuario.role === "patient") {
      if (!usuario.is_profile_complete) {
        return res.status(403).json({
          code: "PROFILE_INCOMPLETE",
          message: "Complete seu perfil para acessar esta funcionalidade.",
        });
      }

      perfilInfo = await Patient.findOne({ where: { user_id: usuario.id } });
    } else if (usuario.role === "therapist") {
      perfilInfo = await Therapist.findOne({ where: { user_id: usuario.id } });
    } else if (usuario.role === "admin") {
      perfilInfo = await Admin.findOne({ where: { user_id: usuario.id } });
    } else {
      return res.status(400).json({
        code: "INVALID_ROLE",
        message: "Função de usuário não reconhecida.",
      });
    }

    req.user = {
      ...usuario.toJSON(),
      perfilInfo,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
