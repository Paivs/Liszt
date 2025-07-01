// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Patient } = require("../models");
const { secret, expiresIn } = require("../config/jwt");
const winston = require("../logs/logger");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  role = "patient"
  //role = "therapist"

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
      address: ""
    })

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


exports.resetPassword = async (req, res) => {
  
}
