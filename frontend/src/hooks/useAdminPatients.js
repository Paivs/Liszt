import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export function usePatients(initialData = []) {
  const [patients, setPatients] = useState(initialData);

  const addPatient = async (data) => {
    try {
      const novo = await api.post("patient", data);
      setPatients((prev) => [novo.patient, ...prev]);
    } catch (err) {
      console.error("addPatient error:", err);
    }
  };

  const updatePatient = async (id, data) => {
    try {
      await api.put(`patient/${id}`, data);
      setPatients((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    } catch (err) {
      console.error("updatePatient error:", err);
    }
  };

  const deletePatient = async (id) => {
    try {
      await api.del(`patient/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("deletePatient error:", err);
    }
  };

  return { patients, addPatient, updatePatient, deletePatient };
}
