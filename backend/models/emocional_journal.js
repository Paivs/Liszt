// models/emotion_journal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patient');

const EmotionJournal = sequelize.define('EmotionJournal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.UUID,
    references: {
      model: Patient,
      key: 'id',
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  mood: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

EmotionJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = EmotionJournal;
