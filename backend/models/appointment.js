// models/session.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Patient = require('./patient');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  therapist_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  patient_id: {
    type: DataTypes.UUID,
    references: {
      model: Patient,
      key: 'id',
    },
    allowNull: false,
  },
  scheduled_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Appointment.belongsTo(User, { foreignKey: 'therapist_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = Appointment;
