const { Appointment, User, Patient, Therapist } = require("../models");
const winston = require("../logs/logger");
const { Op } = require("sequelize");
const { log } = require("winston");

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
    const therapist = await Therapist.findByPk(therapist_id);
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
          model: Therapist,
          attributes: ["id", "name", "email"],
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
          model: Therapist,
          as: "therapist",
          attributes: ["id", "name", "email"],
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
          model: Therapist,
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
  const user_id = req.user.perfilInfo.id;
  const userRole = req.user.role;

  try {
    // Busca a consulta pelo id
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Consulta não encontrada." });
    }

    if (
      (userRole === "therapist" && appointment.therapist_id !== user_id) ||
      (userRole === "patient" && appointment.patient_id !== user_id) ||
      userRole === "admin"
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
          model: Therapist,
          as: "therapist",
          attributes: ["id", "name", "email"],
        },
        {
          model: Patient,
          as: "patient",
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

exports.listAppointmentsByDateRange = async (req, res) => {
  const {
    view = "week",
    search,
    date = new Date(),
    page = 1,
    limit = 10,
  } = req.query;

  const therapist_id = req.user.perfilInfo.id;

  try {
    const where = { therapist_id };
    let startDate, endDate;
    const baseDate = new Date(date);

    // Define intervalo conforme a visualização
    switch (view) {
      case "day":
        startDate = new Date(baseDate.setHours(0, 0, 0, 0));
        endDate = new Date(baseDate.setHours(23, 59, 59, 999));
        break;
      case "week":
        const startOfWeek = new Date(baseDate);
        startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        startDate = startOfWeek;

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        endDate = endOfWeek;
        break;
      case "month":
        startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
        endDate = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );
        break;
      case "agenda":
      default:
        // agenda = sem restrição de data
        break;
    }

    if (startDate || endDate) {
      where.scheduled_time = {};
      if (startDate) where.scheduled_time[Op.gte] = startDate;
      if (endDate) where.scheduled_time[Op.lte] = endDate;
    }

    // Base das opções
    const baseOptions = {
      where,
      order: [["scheduled_time", "ASC"]],
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email"],
        },
      ],
    };

    // Filtro por nome do paciente (case-insensitive)
    if (search) {
      baseOptions.include[0].where = {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }

    let docs = [];
    let pages = 1;
    let total = 0;

    if (view === "agenda") {
      const paginated = await Appointment.paginate({
        ...baseOptions,
        page: Number(page),
        paginate: Number(limit),
      });
      docs = paginated.docs;
      pages = paginated.pages;
      total = paginated.total;
    } else {
      docs = await Appointment.findAll(baseOptions);
      total = docs.length;
    }
    const formattedAppointments = docs.map((appointment) => {
      const start = new Date(appointment.scheduled_time);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      const plain = appointment.get({ plain: true });

      return {
        ...plain,
        end,
        allDay: false,
      };
    });

    res.json({
      data: formattedAppointments,
      meta: {
        total,
        ...(view === "agenda" && {
          pages,
          currentPage: Number(page),
        }),
      },
    });
  } catch (error) {
    winston.error("Erro ao buscar sessões:", error);
    res.status(500).json({
      message: "Erro ao buscar sessões",
      error: error.message,
    });
  }
};

exports.getAppointmentSettingsByTherapist = async (req, res) => {
  try {
    const therapist = req.user.perfilInfo; // Pega o id do terapeuta
    if (req.user.role != "therapist") {
      return res.status(400).json({ message: "Usuário não é terapeuta" });
    }

    // Retorna as configurações do terapeuta
    res.status(200).json({
      available_days: therapist.available_days,
      start_time: therapist.start_time,
      end_time: therapist.end_time,
      accepts_remote: therapist.accepts_remote,
      accepts_presential: therapist.accepts_presential,
    });
  } catch (error) {
    winston.error(
      "Erro ao buscar configurações de agendamento do terapeuta:",
      error
    );
    res.status(500).json({
      message: "Erro interno ao buscar configurações de agendamento.",
    });
  }
};

exports.createByTherapist = async (req, res) => {
  const { patient_id, scheduled_time, type_appointment, location, label, obs } =
    req.body;

  const therapist_id = req.user.perfilInfo.id;
  const therapist = req.user.perfilInfo;

  if (!patient_id || !scheduled_time || !type_appointment) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Paciente não encontrado ou inválido." });
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

    // Validações específicas do terapeuta
    const appointmentData = {
      patient_id,
      scheduled_time,
      location,
      type_appointment,
    };

    const validationErrors = validateAppointmentAgainstTherapist(
      appointmentData,
      therapist
    );

    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Cria a consulta
    const createdAppointment = await Appointment.create({
      therapist_id,
      patient_id,
      scheduled_time,
      location,
      label,
      type_appointment,
      status_appointment: "pendente",
      obs,
    });

    const newAppointment = await Appointment.findByPk(createdAppointment.id, {
      include: [
        // {
        //   model: Therapist,
        //   attributes: ["id", "name", "email"],
        // },
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
      order: [["scheduled_time", "ASC"]],
    });

    return res.status(201).json(formattedAppointment(newAppointment));
  } catch (error) {
    winston.error("Erro ao agendar sessão:", error);
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.updateByTherapist = async (req, res) => {
  const { id } = req.params;
  const { scheduled_time, type_appointment, location, label, obs } = req.body;
  const therapist_id = req.user.perfilInfo.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID do agendamento é obrigatório." });
  }

  try {
    const appointment = await Appointment.findOne({
      where: { id, therapist_id },
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Sessão não encontrada ou não pertence a você." });
    }

    await appointment.update({
      scheduled_time,
      location,
      label,
      type_appointment,
      obs,
    });

    const updatedAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email", "cpf", "phone"],
        },
      ],
    });

    return res.status(200).json(formattedAppointment(updatedAppointment));
  } catch (error) {
    winston.error("Erro ao atualizar sessão:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.updateAppointmentSettings = async (req, res) => {
  try {
    const therapistId = req.user.perfilInfo.id;

    const {
      available_days,
      start_time,
      end_time,
      accepts_remote,
      accepts_presential,
    } = req.body;

    // Validação dos dados recebidos
    if (!Array.isArray(available_days) || !start_time || !end_time) {
      return res.status(400).json({
        message:
          "Dados inválidos. Por favor, forneça os dias de atendimento e os horários.",
      });
    }

    // Verifica se o terapeuta existe
    const therapist = await Therapist.findByPk(therapistId);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado." });
    }

    // Atualiza os dados de configuração do terapeuta
    therapist.available_days = available_days;
    therapist.start_time = start_time;
    therapist.end_time = end_time;
    therapist.accepts_remote = accepts_remote;
    therapist.accepts_presential = accepts_presential;

    // Salva as alterações no banco
    await therapist.save();

    res.status(200).json({
      message: "Configurações de agendamento atualizadas com sucesso!",
    });
  } catch (error) {
    winston.error(
      "Erro ao atualizar configurações de agendamento do terapeuta:",
      error
    );
    res.status(500).json({
      message: "Erro interno ao atualizar configurações de agendamento.",
    });
  }
};

const formattedAppointment = (appointment) => {
  const start = new Date(appointment.scheduled_time);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const plain = appointment.get({ plain: true });

  return {
    ...plain,
    end,
    allDay: false,
  };
};

async function getPatientByUser(id) {
  const patient = await Patient.findOne({ where: { user_id: id } });

  if (!patient) {
    // throw new Error("Usuário não é paciente");
  }

  return patient;
}

function validateAppointmentAgainstTherapist(appointment, therapist) {
  const errors = [];

  const scheduled = new Date(appointment.scheduled_time);
  const dayOfWeek = scheduled.getUTCDay(); // 0=Domingo
  const hour = scheduled.getUTCHours();
  const minute = scheduled.getUTCMinutes();
  const scheduledTimeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  const daysMap = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];
  const dayOfWeekStr = daysMap[dayOfWeek];

  if (therapist.available_days?.length > 0) {
    const normalizedDays = therapist.available_days.map((d) => d.toLowerCase());
    if (!normalizedDays.includes(dayOfWeekStr.toLowerCase())) {
      errors.push(`O terapeuta não atende às ${dayOfWeekStr}s.`);
    }
  }

  if (therapist.start_time && therapist.end_time) {
    if (
      scheduledTimeStr < therapist.start_time ||
      scheduledTimeStr >= therapist.end_time
    ) {
      errors.push(
        `O horário está fora do intervalo permitido (${therapist.start_time} - ${therapist.end_time}).`
      );
    }
  }

  const isPresential = appointment.location === "presencial";
  const isRemote = appointment.location === "remoto";

  if (isPresential && therapist.accepts_presential === false) {
    errors.push("O terapeuta não aceita sessões presenciais.");
  }

  if (isRemote && therapist.accepts_remote === false) {
    errors.push("O terapeuta não aceita sessões remotas.");
  }

  return errors;
}
