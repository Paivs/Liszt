const { Therapist, User } = require("../models");
const bcrypt = require("bcryptjs");

// GET /therapists
exports.getAll = async (req, res) => {
  try {
    const therapists = await Therapist.findAll({
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(therapists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar terapeutas.", error: error.message });
  }
};

exports.listPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const options = {
      page: Number(page),
      paginate: Number(limit),
      order: [["created_at", "DESC"]],
      where: search
        ? {
            name: { [Op.iLike]: `%${search}%` },
          }
        : {},
        order: [["created_at", "DESC"]],
    };

    const { docs, pages, total } = await Therapist.paginate(options);

    res.json({
      data: docs,
      meta: {
        total,
        pages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Erro ao paginar terapeutas:", error);
    res.status(500).json({ message: "Erro interno ao listar terapeutas." });
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
    res
      .status(400)
      .json({ message: "Erro ao criar terapeuta.", error: error.message });
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
    res
      .status(400)
      .json({ message: "Erro ao atualizar terapeuta.", error: error.message });
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

    // Garante que o usuário relacionado existe
    const user = await User.findByPk(therapist.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário associado não encontrado." });
    }

    await user.destroy(); // Isso também deve apagar o terapeuta por causa do CASCADE

    return res.status(200).json({ message: "Terapeuta deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar terapeuta:", error);
    return res
      .status(500)
      .json({
        message: "Erro interno ao deletar terapeuta.",
        error: error.message,
      });
  }
};

exports.deactivateTherapist = async (req, res) => {
  try {
    const { id } = req.params;

    const therapist = await Therapist.findByPk(id);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado" });
    }

    // Marcar como inativo
    await therapist.update({ deactivated_at: new Date() });

    res.status(200).json({ message: "Terapeuta inativado com sucesso" });
  } catch (error) {
    winston.error("Erro ao inativar terapeuta:", error);
    res.status(500).json({ message: "Erro interno ao inativar terapeuta." });
  }
};

exports.reactivateTherapist = async (req, res) => {
  try {
    const { id } = req.params;

    const therapist = await Therapist.findByPk(id);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado" });
    }

    await therapist.update({ deactivated_at: null });

    res.status(200).json({ message: "Terapeuta reativado com sucesso" });
  } catch (error) {
    winston.error("Erro ao reativar terapeuta:", error);
    res.status(500).json({ message: "Erro interno ao reativar terapeuta." });
  }
};

exports.toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const therapist = await Therapist.findByPk(id);
    if (!therapist) {
      return res.status(404).json({ message: "Terapeuta não encontrado" });
    }

    const isCurrentlyInactive = !!therapist.deactivated_at;

    therapist.deactivated_at = isCurrentlyInactive ? null : new Date();
    await therapist.save();

    res.status(200).json(therapist);
  } catch (error) {
    winston.error("Erro ao alternar status de terapeuta:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao alterar status do terapeuta." });
  }
};
