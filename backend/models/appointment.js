// models/session.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Therapist = require("./therapist");
const Patient = require("./patient");
const sequelizePaginate = require("sequelize-paginate");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    therapist_id: {
      type: DataTypes.UUID,
      references: {
        model: Therapist,
        key: "id",
      },
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.UUID,
      references: {
        model: Patient,
        key: "id",
      },
      allowNull: false,
    },
    type_appointment: {
      type: DataTypes.STRING,
    },
    status_appointment: {
      type: DataTypes.STRING,
      defaultValue: "pendente",
      validate: {
        isIn: [["pendente", "aprovada", "reprovada", "concluida", "cancelada"]],
      },
    },
    scheduled_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(20),
      defaultValue: "remoto",
    },
    label: {
      type: DataTypes.STRING(25),
      defaultValue: "sky",
      allowNull: true,
    },
  },
  {
    tableName: "appointment",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

sequelizePaginate.paginate(Appointment);
Appointment.belongsTo(Therapist, { foreignKey: "therapist_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });

module.exports = Appointment;
