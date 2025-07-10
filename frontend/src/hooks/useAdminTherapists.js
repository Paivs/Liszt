// lib/hooks/useAdminTherapists.js
import { api } from "@/lib/api";
import { useState } from "react";

export function useTherapists(initialData = []) {
  const [therapists, setTherapists] = useState(initialData);

  const addTherapist = async (data) => {
    const novo = await api.post("therapists", data);
    setTherapists((prev) => [novo, ...prev]);
  };

  const updateTherapist = async (id, data) => {
    await api.put(`therapists/${id}`, data);
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTherapist = async (id) => {
    const result = await api.del(`therapists/${id}`);
   
    setTherapists((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStatus = async (id) => {
    const updated = await api.put(`therapists/${id}/toggle`);
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    return updated;
  };

  return {
    therapists,
    addTherapist,
    updateTherapist,
    deleteTherapist,
    toggleStatus,
  };
}
