// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Patient = require('./patient');
const EmotionJournal = require('./emotion_journal');
const DreamJournal = require('./dream_journal');
const Session = require('./session');

// Definir relações entre os modelos
User.hasOne(Patient, { foreignKey: 'user_id' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

Patient.hasMany(EmotionJournal, { foreignKey: 'patient_id' });
EmotionJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasMany(DreamJournal, { foreignKey: 'patient_id' });
DreamJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

User.hasMany(Session, { foreignKey: 'therapist_id' });
Session.belongsTo(User, { foreignKey: 'therapist_id' });

Patient.hasMany(Session, { foreignKey: 'patient_id' });
Session.belongsTo(Patient, { foreignKey: 'patient_id' });

// Sincronizar com o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado!');
});

module.exports = { User, Patient, EmotionJournal, DreamJournal, Session };
