// hooks/useAdminAppointments.js
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export function useAppointments(initialData = [], initialMeta = {}) {
  const [appointments, setAppointments] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async ({
    page = 1,
    limit = 10,
    startDate,
    endDate,
  } = {}) => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    try {
      const res = await api.get(`/appointment?${params.toString()}`);
      setAppointments(res.data);
      setMeta(res.meta);
    } catch {
      toast.error("Erro ao buscar sessões");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`appointment/${id}`, { status });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      toast.success("Status atualizado com sucesso");
    } catch {
      toast.error("Erro ao atualizar status da sessão");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.del(`appointment/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success("Sessão removida com sucesso");
    } catch {
      toast.error("Erro ao remover sessão");
    }
  };

  return {
    appointments,
    meta,
    loading,
    fetchAppointments,
    updateStatus,
    deleteAppointment,
  };
}
