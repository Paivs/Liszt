const { Therapist } = require("../models");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

// GET /therapists
exports.getAll = async (req, res) => {
  try {
    const therapists = await Therapist.findAll({ order: [["created_at", "DESC"]] });
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar terapeutas.", error: error.message });
  }
};

// POST /therapists
exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, crp } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role: "therapist",
    });

    const therapist = await Therapist.create({
      user_id: user.id,
      name,
      email,
      phone,
      crp,
      verified: false,
    });

    res.status(201).json(therapist);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar terapeuta.", error: error.message });
  }
};

// PUT /therapists/:id
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const therapist = await Therapist.findByPk(id);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado." });
    }

    await therapist.update(req.body);
    res.status(200).json(therapist);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar terapeuta.", error: error.message });
  }
};

// DELETE /therapists/:id
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const therapist = await Therapist.findByPk(id);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado." });
    }

    await User.destroy({ where: { id: therapist.user_id } }); // remove user + therapist (ON DELETE CASCADE)
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Erro ao deletar terapeuta.", error: error.message });
  }
};
