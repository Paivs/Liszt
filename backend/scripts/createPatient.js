require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { User, Patient } = require("../models");

async function createPatients() {
  try {
    await sequelize.authenticate();
    console.log("📡 Conectado ao banco de dados.");

    const patientsData = [
      {
        name: "Lucas Almeida",
        email: "lucas@paciente.com",
        password: "Senha123!",
        phone: "(11) 91111-1111",
        cpf: "123.456.789-01",
        emergency_contact_name: "Ana Almeida",
        emergency_contact_phone: "(11) 92222-2222",
      },
      {
        name: "Mariana Silva",
        email: "mariana@paciente.com",
        password: "Senha123!",
        phone: "(21) 93333-3333",
        cpf: "987.654.321-00",
        emergency_contact_name: "João Silva",
        emergency_contact_phone: "(21) 94444-4444",
      },
      {
        name: "Carlos Santos",
        email: "carlos@paciente.com",
        password: "Senha123!",
        phone: "(31) 95555-5555",
        cpf: "111.222.333-44",
        emergency_contact_name: "Maria Santos",
        emergency_contact_phone: "(31) 96666-6666",
      },
    ];

    for (const patient of patientsData) {
      const hashedPassword = await bcrypt.hash(patient.password, 10);

      const user = await User.create({
        name: patient.name,
        email: patient.email,
        password_hash: hashedPassword,
        role: "patient",
      });

      await Patient.create({
        user_id: user.id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        cpf: patient.cpf,
        emergency_contact_name: patient.emergency_contact_name,
        emergency_contact_phone: patient.emergency_contact_phone,
      });

      console.log(`✅ Paciente criado: ${patient.name}`);
    }

    console.log("🎉 Todos os pacientes foram criados com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao criar pacientes:", error.message);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexão com o banco encerrada.");
  }
}

createPatients();
