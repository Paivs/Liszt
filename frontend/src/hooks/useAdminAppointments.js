// hooks/useAdminAppointments.js
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export function useAppointments(initialData = []) {
  const [appointments, setAppointments] = useState(initialData);

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

  return { appointments, updateStatus, deleteAppointment };
}
