const { DreamJournal, EmotionJournal, User, Patient } = require("../models");
const winston = require("../logs/logger");

exports.createDream = async (req, res) => {
  const {
    date,
    type_appointment,
    clarity,
    title,
    dream_description,
    emotions_list,
    symbols_list,
  } = req.body;

  const user_id = req.user.id;

  // Busca paciente pelo user_id
  const patient = await Patient.findOne({ where: { user_id } });

  if (!patient) {
    return res.status(400).json({ message: "Usuário não é paciente" });
  }

  const patient_id = patient.id;

  if (
    !date ||
    !type_appointment ||
    !clarity ||
    !title ||
    !dream_description ||
    !emotions_list ||
    !symbols_list
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Cria a consulta
    const newDream = await DreamJournal.create({
      patient_id,
      date,
      type_appointment,
      clarity,
      title,
      dream_description,
      emotions_list,
      symbols_list,
    });

    return res.status(201).json({
      message: "Sonho anotado com sucesso.",
      dream: newDream,
    });
  } catch (error) {
    winston.error("Erro ao criar diário de sonhos:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.listAllDreams = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const patient = await Patient.findOne({ where: { user_id } });

    if (!patient) {
      return res.status(403).json({ message: "Usuário não é paciente" });
    }

    const dreams = await DreamJournal.findAll({
      where: { patient_id: patient.id },
      order: [["created_at", "DESC"]], // opcional
    });

    res.status(200).json(dreams);
  } catch (error) {
    winston.error("Erro ao listar diário de sonhos:", error);
    res.status(500).json({
      message: "Erro interno ao listar diário de sonhos.",
    });
  }
};


exports.createEmotion = async (req, res) => {};
