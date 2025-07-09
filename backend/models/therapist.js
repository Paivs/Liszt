// models/therapist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Therapist = sequelize.define('Therapist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
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
  address: {
    type: DataTypes.TEXT,
  },
  accepts_local: {
    type: DataTypes.BOOLEAN,
  },
  available_days: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  profile_picture: {
    type: DataTypes.TEXT,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  visibility: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  crp: {
    type: DataTypes.STRING,
  },
  specialties: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  approach: {
    type: DataTypes.TEXT,
  },
  last_login: {
    type: DataTypes.DATE,
  },
  deactivated_at: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Therapist;
