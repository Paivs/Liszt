"use client";

import { useState, useEffect } from "react";
import { EventCalendar } from "@/components/event-calendar";
import { Button } from "@/components/ui/button";
import { addDays, setHours, setMinutes } from "date-fns";
import { useTherapistAppointment } from "@/hooks/useTherapistAppointment";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AppointmentTherapistClient = ({ initialData, meta }) => {
  const [appointments, setAppointments] = useState(initialData);
  const [view, setView] = useState("semana");
  const [metaState, setMetaState] = useState(meta || {});
  const [currentPage, setCurrentPage] = useState(meta?.currentPage || 1);

  const {
    createAppointment,
    updateAppointment,
    fetchAppointments,
    deleteAppointment,
  } = useTherapistAppointment();

  useEffect(() => {
    setAppointments(initialData);
  }, [initialData]);

  const availableTimes = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeSlot = `${hour}:${minute === 0 ? "00" : "30"}`;
      availableTimes.push({
        time: timeSlot,
        isBooked: appointments.some(
          (appointment) =>
            new Date(appointment.scheduled_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) === timeSlot
        ),
      });
    }
  }

  const handleAppointmentAdd = async (data) => {
    const newAppointment = await createAppointment(data);
    console.log(newAppointment);

    setAppointments([...appointments, newAppointment]);
  };

  const handleAppointmentUpdate = async (data) => {
    const newData = await updateAppointment(data);
    setAppointments(
      appointments.map((event) => (event.id === data.id ? newData : event))
    );
  };

  const handleAppointmentDelete = async (eventId) => {
    await deleteAppointment(eventId);
    setAppointments(appointments.filter((event) => event.id !== eventId));
  };

  const handleViewChange = async (newView) => {
    if (newView != view) {
      setView(newView);
      setCurrentPage(1);
      const { data, meta } = await fetchAppointments({
        view: newView,
        page: 1,
      });
      setAppointments(data);
      setMetaState(meta);
    }
  };

  return (
    <div className="px-4 space-y-6">
      <EventCalendar
        events={appointments}
        onEventAdd={handleAppointmentAdd}
        onEventUpdate={handleAppointmentUpdate}
        onEventDelete={handleAppointmentDelete}
        onViewChange={handleViewChange}
        initialView="semana"
      />

      {view === "agenda" && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={async () => {
                    const newPage = currentPage - 1;
                    const { data, meta } = await fetchAppointments({
                      view,
                      page: newPage,
                    });
                    setAppointments(data);
                    setMetaState(meta);
                    setCurrentPage(newPage);
                  }}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: metaState.pages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index + 1 === currentPage}
                    onClick={async () => {
                      const newPage = index + 1;
                      const { data, meta } = await fetchAppointments({
                        view,
                        page: newPage,
                      });
                      setAppointments(data);
                      setMetaState(meta);
                      setCurrentPage(newPage);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={async () => {
                    const newPage = currentPage + 1;
                    const { data, meta } = await fetchAppointments({
                      view,
                      page: newPage,
                    });
                    setAppointments(data);
                    setMetaState(meta);
                    setCurrentPage(newPage);
                  }}
                  disabled={currentPage === metaState.pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AppointmentTherapistClient;
