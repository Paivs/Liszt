// hooks/useTherapistAppointment.js
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function useTherapistAppointment(initialData = [], initialMeta = {}) {
  const [appointments, setAppointments] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async ({ search, status, view, page = 1 }) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (view) params.set("view", view);
    params.set("page", page);

    try {
      const { data, meta } = await api.get(
        `appointment/paginate-therapist?${params.toString()}`
      );

      setAppointments(data || []);
      setMeta(meta || {});
      return { data, meta };
    } catch (error) {
      toast.error("Erro ao buscar sessões.");
      return {
        data: [],
        meta: { total: 0, pages: 1, currentPage: 1 },
      };
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (data) => {
    try {
      const newAppointment = await api.post("appointment/therapist", data);
      toast.success("Sessão criada com sucesso.");
      return newAppointment;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar sessão.");
    }
  };

  const updateAppointment = async (data) => {
    try {
      console.log(data);
      const newData = await api.put(`appointment/therapist/${data.id}`, data);
      console.log(newData);
      toast.success("Sessão atualizada com sucesso.");
      return newData
    } catch (error) {
      toast.error("Erro ao atualizar sessão.");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.del(`appointment/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
      toast.success("Sessão excluída com sucesso.");
    } catch (error) {
      console.error(error);
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
