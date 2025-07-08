const { User } = require("../models");
const winston = require("../logs/logger");
const bcrypt = require("bcryptjs");


exports.updatePassword = async (req, res) => {
  console.log("cheiguei");
  
  try {
    const { last_password, new_password } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(last_password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Senha atual incorreta." });
    }

    const newHash = await bcrypt.hash(new_password, 10);
    user.password_hash = newHash;

    await user.save();

    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    winston.error("Erro ao atualizar senha:", error);
    res.status(500).json({ message: "Erro interno ao atualizar a senha." });
  }
};

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

exports.describeUser = async (req, res) => {
  try {
    const id = req.user.id;
    const role = req.user.role;

    let patientUser = null;

    if (role === "patient") {
      const patient_id = req.user.perfilInfo?.id;
      if (!patient_id) {
        return res.status(400).json({ message: "Perfil do paciente não encontrado." });
      }

      patientUser = req.user.perfilInfo;
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({
      message: "Usuário encontrado com sucesso",
      user,
      patientUser,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno ao buscar o usuário." });
  }
};
