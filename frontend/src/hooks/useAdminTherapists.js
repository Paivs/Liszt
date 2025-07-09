// lib/hooks/useTherapists.js
import { api } from "@/lib/api";
import { useState } from "react";

export function useTherapists(initialData = []) {
  const [therapists, setTherapists] = useState(initialData);

  const addTherapist = async (data) => {
    const novo = await api.post("api/therapists");
    setTherapists((prev) => [novo, ...prev]);
  };

  const updateTherapist = async (id, data) => {
    api.put(`/api/therapists/${id}`);
    setTherapists((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTherapist = async (id) => {
    api.del(`/api/therapists/${id}`);
    setTherapists((prev) => prev.filter((t) => t.id !== id));
  };

  return { therapists, addTherapist, updateTherapist, deleteTherapist };
}
