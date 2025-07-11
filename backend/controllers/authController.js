// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Patient } = require("../models");
const { secret, expiresIn } = require("../config/jwt");
const winston = require("../logs/logger");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  role = "patient";

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role,
    });

    const patient = await Patient.create({
      name,
      user_id: user.id,
      email,
      cpf: "",
      phone: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      address: "",
    });

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn,
    });

    winston.info(`Novo usuário registrado: ${email}`);

    res.status(201).json({ token });
  } catch (error) {
    winston.error(error);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

exports.registerFull = async (req, res) => {
  const {
    phone,
    cpf,
    emergency_contact_name,
    emergency_contact_phone,
    address,
  } = req.body;

  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verifica se o usuário tem permissão para completar o perfil
    if (usuario.role !== "patient") {
      return res.status(403).json({
        code: "FORBIDDEN_ROLE",
        message: "Apenas pacientes podem completar este tipo de cadastro.",
      });
    }

    const patient = await Patient.findOne({ where: { user_id: usuario.id } });

    if (!patient) {
      return res.status(404).json({ message: "Perfil de paciente não encontrado." });
    }

    // Atualiza os dados
    patient.cpf = cpf;
    patient.phone = phone;
    patient.emergency_contact_name = emergency_contact_name;
    patient.emergency_contact_phone = emergency_contact_phone;
    patient.address = address;

    usuario.is_profile_complete = true;

    await patient.save();
    await usuario.save();

    winston.info(`Paciente registrado com sucesso: ${patient.id}`);

    return res.status(201).json({
      message: "Cadastro finalizado com sucesso!",
      user: usuario.toJSON(),
      patient,
    });
  } catch (error) {
    console.error(error);
    winston.error(error);
    return res.status(500).json({
      message: "Erro ao finalizar cadastro de usuário",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn,
    });

    winston.info(`Usuário logado: ${email}`);

    const { id, name, email: userEmail, role } = user;

    res.json({
      token,
      user: { id, name, email: userEmail, role },
    });
  } catch (error) {
    winston.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

exports.resetPassword = async (req, res) => {};
