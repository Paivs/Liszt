// models/therapist.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const sequelizePaginate = require("sequelize-paginate");

const Therapist = sequelize.define(
  "Therapist",
  {
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
        key: "id",
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
    available_days: {
      type: DataTypes.ARRAY(DataTypes.TEXT), // Armazenando os dias em formato JSON (Exemplo: ["Segunda", "Terça"])
      // allowNull: false,
      // defaultValue: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"], // Padrão para todos os dias úteis
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "08:00", // Valor padrão para horário de início
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "18:00", // Valor padrão para horário de término
    },
    accepts_remote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Aceita atendimento remoto por padrão é 'false'
    },
    accepts_presential: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Aceita atendimento presencial por padrão é 'true'
    },
    last_login: {
      type: DataTypes.DATE,
    },
    deactivated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "therapist",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

sequelizePaginate.paginate(Therapist);
module.exports = Therapist;
