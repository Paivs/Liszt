const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patient');

const DreamJournal = sequelize.define('DreamJournal', {
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
  title: {
    type: DataTypes.STRING,
  },
  dream_description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  clarity: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  emotions_list: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  symbols_list: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {

  tableName: 'dream_journal',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

DreamJournal.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = DreamJournal;
