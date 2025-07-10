// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Patient = require('./patient');
const EmotionJournal = require('./emotion_journal');
const DreamJournal = require('./dream_journal');
const Appointment = require('./appointment');
const Therapist = require('./therapist');
const Admin = require('./admin');

// Relações com CASCADE corretamente aplicado

// Paciente
User.hasOne(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true });
Patient.belongsTo(User, { foreignKey: 'user_id' });

// Terapeuta
User.hasOne(Therapist, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true });
Therapist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Admin
Admin.belongsTo(User, { foreignKey: 'user_id' });

// Relacionamentos de diários com paciente
Patient.hasMany(EmotionJournal, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
EmotionJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasMany(DreamJournal, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
DreamJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

// Relacionamentos de agendamentos
User.hasMany(Appointment, { foreignKey: 'therapist_id', onDelete: 'CASCADE', hooks: true });
// Appointment.belongsTo(User, { foreignKey: 'therapist_id', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'therapist_id', as: 'therapist' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });



Patient.hasMany(Appointment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

// Sincronizar com o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado!');
});

module.exports = {
  sequelize,
  User,
  Patient,
  EmotionJournal,
  DreamJournal,
  Appointment,
  Therapist,
  Admin
};
