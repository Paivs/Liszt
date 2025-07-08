const { DreamJournal, EmotionJournal, User, Patient } = require("../models");
const winston = require("../logs/logger");

exports.createDream = async (req, res) => {
  const {
    date,
    category,
    title,
    dream_description,
    emotions_list,
    symbols_list,
    clarity,
  } = req.body;

  const patient_id = req.user.perfilInfo.id;

  console.log(req.body)

  if (
    !date ||
    !category ||
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
      category,
      title,
      dream_description,
      emotions_list,
      symbols_list,
      clarity,
    });

    return res.status(201).json({
      message: "Sonho anotado com sucesso.",
      newDream: newDream,
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

exports.deleteDream = async (req, res) => {
  const { id } = req.params;
  const patient_id = req.user.perfilInfo.id;

  try {
    const emotion = await DreamJournal.findOne({
      where: { id, patient_id },
    });

    if (!emotion) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    await emotion.destroy();

    return res.status(200).json({ message: "Sonho removida com sucesso." });
  } catch (error) {
    winston.error("Erro ao deletar emoção:", error);
    return res.status(500).json({ message: "Erro interno ao deletar sonho." });
  }
};

exports.createEmotion = async (req, res) => {
  const { date, mood, intensity, emotion_trigger, description } = req.body;
  console.log(req.body);

  const patient_id = req.user.perfilInfo.id;

  if (!date || !mood || !intensity || !emotion_trigger || !description) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Cria a consulta
    const newEmotion = await EmotionJournal.create({
      patient_id,
      date,
      mood,
      intensity,
      emotion_trigger,
      description,
    });

    return res.status(201).json({
      message: "Emoção anotada com sucesso.",
      emotion: newEmotion,
    });
  } catch (error) {
    winston.error("Erro ao criar diário de emoções:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.listAllEmotions = async (req, res) => {
  try {
    const patient_id = req.user.perfilInfo.id;

    const emotions = await EmotionJournal.findAll({
      where: { patient_id: patient_id },
      order: [["created_at", "DESC"]], // opcional
    });

    res.status(200).json(emotions);
  } catch (error) {
    winston.error("Erro ao listar diário de emoções:", error);
    res.status(500).json({
      message: "Erro interno ao listar diário de emoções.",
    });
  }
};

exports.deleteEmotion = async (req, res) => {
  const { id } = req.params;
  const patient_id = req.user.perfilInfo.id;

  try {
    const emotion = await EmotionJournal.findOne({
      where: { id, patient_id },
    });

    if (!emotion) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    await emotion.destroy();

    return res.status(200).json({ message: "Emoção removida com sucesso." });
  } catch (error) {
    winston.error("Erro ao deletar emoção:", error);
    return res.status(500).json({ message: "Erro interno ao deletar emoção." });
  }
};
