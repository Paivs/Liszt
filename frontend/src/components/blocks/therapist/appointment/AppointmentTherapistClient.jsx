"use client";

import { useState, useEffect } from "react";
import { EventCalendar } from "@/components/event-calendar";
import { Button } from "@/components/ui/button";
import { addDays, setHours, setMinutes } from "date-fns";

const AppointmentTherapistClient = ({ initialData, meta }) => {
  const [appointments, setAppointments] = useState(initialData);

  console.log(appointments);
  

  useEffect(() => {
    setAppointments(initialData);
  }, [initialData]);

  const availableTimes = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeSlot = `${hour}:${minute === 0 ? "00" : "30"}`;
      availableTimes.push({
        time: timeSlot,
        isBooked: appointments.some((appointment) =>
          new Date(appointment.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === timeSlot
        ),
      });
    }
  }

  const handleEventAdd = (event) => {
    setAppointments([...appointments, event]);
  };

  const handleEventUpdate = (updatedEvent) => {
    setAppointments(
      appointments.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId) => {
    setAppointments(appointments.filter((event) => event.id !== eventId));
  };

  return (
    <div className="px-4 space-y-6">
      <h2 className="text-xl font-semibold">Gerenciamento de Agendamentos</h2>

      <EventCalendar
        events={appointments}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        initialView="week"
      />

      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">Página {meta.currentPage} de {meta.pages}</span>
        </div>
        <div>
          <Button
            disabled={meta.currentPage === 1}
            onClick={() => {
              // Lógica para ir para a página anterior
            }}
          >
            Anterior
          </Button>
          <Button
            disabled={meta.currentPage === meta.pages}
            onClick={() => {
              // Lógica para ir para a próxima página
            }}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTherapistClient;
