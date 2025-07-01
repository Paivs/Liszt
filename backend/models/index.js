// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Patient = require('./patient');
const EmotionJournal = require('./emotion_journal');
const DreamJournal = require('./dream_journal');
const Appointment = require('./appointment');

// Definir relações entre os modelos
User.hasOne(Patient, { foreignKey: 'user_id' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

Patient.hasMany(EmotionJournal, { foreignKey: 'patient_id' });
EmotionJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasMany(DreamJournal, { foreignKey: 'patient_id' });
DreamJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

User.hasMany(Appointment, { foreignKey: 'therapist_id' });
Appointment.belongsTo(User, { foreignKey: 'therapist_id' });

Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

// Sincronizar com o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado!');
});

module.exports = { User, Patient, EmotionJournal, DreamJournal, Appointment };
