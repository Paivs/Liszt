// models/patient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const sequelizePaginate = require("sequelize-paginate");



const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  emergency_contact_name: {
    type: DataTypes.STRING,
  },
  emergency_contact_phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'patient',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

sequelizePaginate.paginate(Patient);
Patient.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Patient;
