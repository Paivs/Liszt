require("dotenv").config();
const sequelize = require("../config/db");
const { Appointment } = require("../models");
const { faker } = require("@faker-js/faker");

async function createAppointments() {
  try {
    await sequelize.authenticate();
    console.log("📡 Conectado ao banco de dados.");

    const therapistId = "3ee82783-4332-46a0-8b2d-b8fd1527d894";
    const patientsId = [
      "fe1c2942-7d82-415d-bc88-7e5efa5c48d2",
      "376736d5-991d-41ef-8c38-64881a87cecc",
      "43fe8546-1fca-492a-b5cf-6ef0477a6eda"
    ];

    const typeOptions = ["individual", "casal", "familiar", "avaliacao"];
    const statusOptions = ["pendente", "aprovada", "reprovada", "concluida"];

    const appointmentsToCreate = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // zero-based

    const startDay = today.getDate() + 1;


    // Criar 15 agendamentos em dias úteis, horários variados
    for (let day = startDay; day <= 28; day++) {
      const date = new Date(year, month, day);

      // Apenas dias úteis (segunda a sexta)
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      // Gerar dois horários por dia: 10h e 14h
      for (let hour of [10, 14]) {
        const scheduled_time = new Date(date);
        scheduled_time.setHours(hour, 0, 0, 0);

        appointmentsToCreate.push({
          therapist_id: therapistId,
          patient_id: faker.helpers.arrayElement(patientsId),
          type_appointment: faker.helpers.arrayElement(typeOptions),
          status_appointment: faker.helpers.arrayElement(statusOptions),
          scheduled_time,
        });
      }
    }

    for (const appointment of appointmentsToCreate) {
      await Appointment.create(appointment);
      console.log(
        `✅ Agendamento: ${appointment.scheduled_time.toISOString()} - Paciente ${appointment.patient_id}`
      );
    }

    console.log("🎉 Todos os agendamentos foram criados com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao criar agendamentos:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexão com o banco encerrada.");
  }
}

createAppointments();
