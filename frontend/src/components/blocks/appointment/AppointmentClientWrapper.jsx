"use client";
import React from "react";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import usePatientAppointment from "@/hooks/usePatientAppointment";

export default function AppointmentClientWrapper({ terapeutas, agendamentos: initialAgendamentos }) {
  const { agendamentos, addAppointment, removeAppointment } = usePatientAppointment(initialAgendamentos || []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AppointmentForm terapeutas={terapeutas} onAddAppointment={addAppointment} />
      <AppointmentList agendamentos={agendamentos} onRemoveAppointment={removeAppointment} />
    </div>
  );
} 