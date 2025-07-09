// lib/hooks/useAdminPatients.js
import { api } from "@/lib/api";
import { useState } from "react";

export function usePatients(initialData = []) {
  const [patients, setPatients] = useState(initialData);

  const addPatient = async (data) => {
    const novo = await api.post("api/patients", data);
    setPatients((prev) => [novo, ...prev]);
  };

  const updatePatient = async (id, data) => {
    await api.put(`/api/patients/${id}`, data);
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deletePatient = async (id) => {
    await api.del(`/api/patients/${id}`);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return { patients, addPatient, updatePatient, deletePatient };
}
