"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTherapistAppointments } from "@/hooks/useTherapistAppointments";

const AppointmentScheduler = () => {
  const { appointments, loading } = useTherapistAppointments();
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const times = [];
    // Gerar os horários entre 08:00 e 18:00
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeSlot = `${hour}:${minute === 0 ? "00" : "30"}`;
        times.push({
          time: timeSlot,
          isBooked: appointments.some((appointment) =>
            new Date(appointment.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === timeSlot
          ),
        });
      }
    }
    setAvailableTimes(times);
  }, [appointments]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {availableTimes.map(({ time, isBooked }, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-4 border rounded-md ${
            isBooked ? "bg-green-200" : "bg-gray-100"
          }`}
        >
          <span className="text-xl font-semibold">{time}</span>
          <Button
            className={`mt-2 ${isBooked ? "opacity-50 cursor-not-allowed" : "bg-primary"}`}
            disabled={isBooked}
          >
            {isBooked ? "Reservado" : "Agendar"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentScheduler;
