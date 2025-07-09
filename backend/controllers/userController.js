const { User, Patient } = require("../models");
const winston = require("../logs/logger");
const bcrypt = require("bcryptjs");

exports.updatePassword = async (req, res) => {
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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({ message: "Perfil atualizado com sucesso." });
  } catch (error) {
    winston.error("Erro ao atualizar perfil:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao atualizar perfil." });
  }
};

exports.updatePatientData = async (req, res) => {
  try {
    const id = req.user.perfilInfo.id;

    const {
      cpf,
      phone,
      emergency_contact_name,
      emergency_contact_phone,
      address,
    } = req.body;

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    patient.cpf = cpf;
    patient.phone = phone;
    patient.emergency_contact_name = emergency_contact_name;
    patient.emergency_contact_phone = emergency_contact_phone;
    patient.address = address;

    await patient.save();

    return res
      .status(200)
      .json({ message: "Dados do paciente atualizados com sucesso." });
  } catch (error) {
    winston.error("Erro ao atualizar dados do paciente:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao atualizar dados do paciente." });
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

    const profile = req.user.perfilInfo;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({
      message: "Usuário encontrado com sucesso",
      user,
      profile,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno ao buscar o usuário." });
  }
};
