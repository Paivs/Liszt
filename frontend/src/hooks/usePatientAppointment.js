import { useState, useCallback } from "react";
import { createAppointment as apiCreate, getAllAppointments, deleteAppointment as apiDelete } from "@/lib/appointment";

export default function usePatientAppointment(initialAgendamentos = []) {
  const [agendamentos, setAgendamentos] = useState(initialAgendamentos);

  // Adiciona um novo agendamento ao estado local
  const addAppointment = useCallback((novo) => {
    setAgendamentos((prev) => [...prev, novo]);
  }, []);

  // Remove um agendamento do estado local
  const removeAppointment = useCallback((id) => {
    setAgendamentos((prev) => prev.filter((ag) => ag.id !== id));
  }, []);

  // Busca todos os agendamentos do backend e atualiza o estado
  const fetchAppointments = useCallback(async () => {
    const data = await getAllAppointments();
    setAgendamentos(data || []);
    return data;
  }, []);

  // Cria um novo agendamento via API e atualiza o estado
  const create = useCallback(async (therapist_id, scheduled_time, type_appointment, obs) => {
    const novo = await apiCreate(therapist_id, scheduled_time, type_appointment, obs);
    setAgendamentos((prev) => [...prev, novo]);
    return novo;
  }, []);

  // Remove um agendamento via API e atualiza o estado
  const remove = useCallback(async (id) => {
    await apiDelete(id);
    setAgendamentos((prev) => prev.filter((ag) => ag.id !== id));
  }, []);

  return {
    agendamentos,
    setAgendamentos,
    addAppointment,
    removeAppointment,
    fetchAppointments,
    createAppointment: create,
    deleteAppointment: remove,
  };
} 