// ./scripts/createTherapist.js
require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { User } = require("../models");
const { Therapist } = require("../models");

async function createTherapists() {
  try {
    await sequelize.authenticate();
    console.log("📡 Conectado ao banco de dados.");

    const therapistsData = [
      {
        name: "Dra. Camila Souza",
        email: "camila@terapia.com",
        password: "Senha123!",
        phone: "(11) 99999-1111",
        crp: "06/123456",
      },
      {
        name: "Dr. Rafael Lima",
        email: "rafael@terapia.com",
        password: "Senha123!",
        phone: "(21) 98888-2222",
        crp: "06/654321",
      },
      {
        name: "Dra. Juliana Castro",
        email: "juliana@terapia.com",
        password: "Senha123!",
        phone: "(31) 97777-3333",
        crp: "06/789123",
      },
    ];

    for (const therapist of therapistsData) {
      const hashedPassword = await bcrypt.hash(therapist.password, 10);

      const user = await User.create({
        name: therapist.name,
        email: therapist.email,
        password_hash: hashedPassword,
        role: "therapist",
      });

      await Therapist.create({
        user_id: user.id,
        name: therapist.name,
        email: therapist.email,
        phone: therapist.phone,
        crp: therapist.crp,
        verified: true,
      });

      console.log(`✅ Terapeuta criado: ${therapist.name}`);
    }

    console.log("🎉 Todos os terapeutas foram criados com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao criar terapeutas:", error.message);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexão com o banco encerrada.");
  }
}

createTherapists();
