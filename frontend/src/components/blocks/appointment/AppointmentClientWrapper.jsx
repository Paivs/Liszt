"use client";
import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

export default function AppointmentClientWrapper({ terapeutas, agendamentos: initialAgendamentos }) {
  const [agendamentos, setAgendamentos] = useState(initialAgendamentos || []);

  // Função para adicionar novo agendamento à lista
  const handleAddAppointment = (novo) => {
    setAgendamentos((prev) => [...prev, novo]);
  };

  // Função para remover agendamento da lista
  const handleRemoveAppointment = (id) => {
    setAgendamentos((prev) => prev.filter((ag) => ag.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AppointmentForm terapeutas={terapeutas} onAddAppointment={handleAddAppointment} />
      <AppointmentList agendamentos={agendamentos} onRemoveAppointment={handleRemoveAppointment} />
    </div>
  );
} 