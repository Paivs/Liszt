const { User } = require("../models");
const winston = require("../logs/logger");

exports.listAllTherapist = async (req, res) => {
  try {
    const therapists = await User.findAll({
      where: { role: "therapist" },
      attributes: { exclude: ["password_hash"] }, // opcional: remover o hash da senha
      order: [["name", "ASC"]],
    });
    

    res.status(200).json(therapists);
  } catch (error) {
    winston.error("Erro ao listar terapeutas:", error);
    res.status(500).json({ message: "Erro interno ao listar terapeutas." });
  }
};
