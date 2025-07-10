const { User, Patient } = require("../models");
const winston = require("../logs/logger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.listAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      order: [["name", "ASC"]],
    });
    res.status(200).json(patients);
  } catch (error) {
    winston.error("Erro ao listar pacientes:", error);
    res.status(500).json({ message: "Erro interno ao listar pacientes." });
  }
};

exports.listPaginated = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const options = {
      page: parseInt(page),
      paginate: parseInt(limit),
      where: search
        ? {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {},
      order: [["created_at", "DESC"]],
    };

    const { docs, pages, total } = await Patient.paginate(options);

    res.json({
      data: docs,
      meta: {
        total,
        pages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Erro na paginação:", error);
    res.status(500).json({ message: "Erro ao listar pacientes com paginação." });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const {
      name,
      cpf,
      email,
      phone,
      emergency_contact_name,
      emergency_contact_phone,
      address,
    } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash("liszt@123", 10);
    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role: "patient",
    });

    const patient = await Patient.create({
      name,
      user_id: user.id,
      cpf,
      email,
      phone,
      emergency_contact_name,
      emergency_contact_phone,
      address
    })

    res
      .status(201)
      .json({ patient: patient })

  } catch (error) {}
};

exports.deletePatientAndUser = async (req, res) => {
  try {
    const { id } = req.params; 

    // Buscar o paciente para pegar o user_id
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }

    const userId = patient.user_id;

    // Deletar o paciente
    await patient.destroy();

    // Deletar o usuário vinculado
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: "Paciente e usuário deletados com sucesso" });
  } catch (error) {
    winston.error("Erro ao deletar paciente e usuário:", error);
    res.status(500).json({ message: "Erro interno ao deletar paciente e usuário." });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      cpf,
      email,
      phone,
      emergency_contact_name,
      emergency_contact_phone,
      address,
    } = req.body;

    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }

    await patient.update({
      name,
      cpf,
      email,
      phone,
      emergency_contact_name,
      emergency_contact_phone,
      address,
    });

    res.status(200).json({ patient });
  } catch (error) {
    winston.error("Erro ao atualizar paciente:", error);
    res.status(500).json({ message: "Erro interno ao atualizar paciente." });
  }
};




