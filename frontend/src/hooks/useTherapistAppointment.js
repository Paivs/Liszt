// hooks/useTherapistAppointment.js
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function useTherapistAppointment(initialData = [], initialMeta = {}) {
  const [appointments, setAppointments] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async ({ search, status, page = 1 }) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    params.set("page", page);

    try {
      const response = await api.get(`paginate-therapist?${params.toString()}`);
      setAppointments(response.data);
      setMeta(response.meta);
    } catch (error) {
      toast.error("Erro ao buscar sessões.");
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (data) => {
    try {
      await api.post("appointments", data);
      toast.success("Sessão criada com sucesso.");
    } catch (error) {
      toast.error("Erro ao criar sessão.");
    }
  };

  const updateAppointment = async (id, data) => {
    try {
      await api.put(`appointment/${id}`, data);
      toast.success("Sessão atualizada com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar sessão.");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`appointment/${id}`);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      toast.success("Sessão excluída com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir sessão.");
    }
  };

  return {
    appointments,
    meta,
    loading,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
