const { Appointment, User, Patient } = require("../models");
const winston = require("../logs/logger");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  const { therapist_id, scheduled_time, type_appointment, obs } = req.body;

  const patient_id = req.user.perfilInfo.id;

  if (!therapist_id || !patient_id || !scheduled_time || !type_appointment) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Verifica terapeuta
    const therapist = await User.findByPk(therapist_id);
    if (!therapist || therapist.role !== "therapist") {
      return res
        .status(404)
        .json({ message: "Terapeuta não encontrado ou inválido." });
    }

    // Verifica paciente
    const patientExists = await Patient.findByPk(patient_id);
    if (!patientExists) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    // Verifica conflito de horário
    const existing = await Appointment.findOne({
      where: { therapist_id, scheduled_time },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "O terapeuta já tem uma sessão nesse horário." });
    }

    // Cria a consulta
    const createdAppointment = await Appointment.create({
      therapist_id,
      patient_id,
      scheduled_time,
      type_appointment,
      status_appointment: "pendente",
      obs,
    });

    const newAppointment = await Appointment.findByPk(createdAppointment.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Patient,
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
      order: [["scheduled_time", "ASC"]],
    });

    return res.status(201).json(newAppointment);
  } catch (error) {
    winston.error("Erro ao agendar sessão:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.getAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: "therapist", // alias se definido, senão remova
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Patient,
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
      order: [["scheduled_time", "ASC"]],
    });

    res.status(200).json(appointments);
  } catch (error) {
    winston.error("Erro ao listar sessões:", error);
    res.status(500).json({ message: "Erro interno ao listar sessões." });
  }
};

exports.listPaginated = async (req, res) => {
  const { page = 1, limit = 10, startDate, endDate } = req.query;
  try {
    const where = {};

    if (startDate || endDate) {
      where.scheduled_time = {};
      if (startDate) {
        where.scheduled_time[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        where.scheduled_time[Op.lte] = new Date(endDate);
      }
    }

    const options = {
      page: Number(page),
      paginate: Number(limit),
      order: [["scheduled_time", "ASC"]],
      where,
      include: [
        {
          model: User,
          as: "therapist",
          attributes: ["id", "name", "email"],
        },
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email"],
        },
      ],
    };

    const { docs, pages, total } = await Appointment.paginate(options);

    res.json({
      data: docs,
      meta: {
        total,
        pages,
        currentPage: Number(page),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Erro ao buscar sessões",
      error: err.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params; // id da consulta

  try {
    // Busca a consulta pelo id
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Consulta não encontrada." });
    }

    //verificação: apenas os envolvidos podem remover o appointment
    const patient = await getPatientByUser(req.user.id);
    const userRole = req.user.role;

    if (
      (userRole === "therapist" && appointment.therapist_id !== userId) ||
      (userRole === "patient" && appointment.patient_id !== patient.id)
    ) {
      return res
        .status(403)
        .json({ message: "Acesso negado para deletar essa consulta." });
    }

    winston.info("[" + appointment.id + "] consulta destruída");
    await appointment.destroy();

    return res.status(200).json({ message: "Consulta deletada com sucesso." });
  } catch (error) {
    winston.error("Erro ao deletar consulta:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.getAllByUser = async (req, res) => {
  const id = await req.user.perfilInfo.id;
  const role = await req.user.role;

  try {
    let whereClause;

    if (role === "therapist") {
      whereClause = { therapist_id: id };
    } else {
      whereClause = { patient_id: id };
    }

    const sessions = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Patient,
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
      order: [["scheduled_time", "ASC"]],
    });

    res.status(200).json(sessions);
  } catch (error) {
    winston.error("Erro ao buscar sessões do usuário:", error);
    res.status(500).json({ message: "Erro interno ao buscar sessões." });
  }
};

exports.getAllByTherapist = async (req, res) => {
  const id = await req.user.perfilInfo.id;
  const role = await req.user.role;

  try {
    let whereClause;

    if (role === "therapist") {
      whereClause = { therapist_id: id };
    } else {
      whereClause = { patient_id: id };
    }

    const sessions = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Patient,
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
      order: [["scheduled_time", "ASC"]],
    });

    res.status(200).json(sessions);
  } catch (error) {
    winston.error("Erro ao buscar sessões do usuário:", error);
    res.status(500).json({ message: "Erro interno ao buscar sessões." });
  }
};

async function getPatientByUser(id) {
  const patient = await Patient.findOne({ where: { user_id: id } });

  if (!patient) {
    // throw new Error("Usuário não é paciente");
  }

  return patient;
}
