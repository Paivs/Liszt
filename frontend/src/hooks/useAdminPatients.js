import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export function usePatients(initialData = [], initialMeta = {}) {
  const [patients, setPatients] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);


  const fetchPatients = async ({
    page = 1,
    limit = 10,
    search = "",
    filter = "all",
  }) => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);
    if (search) params.set("search", search);
    if (filter && filter !== "all") params.set("filter", filter);

    const res = await api.get(`patient/paginate?${params.toString()}`);

    setPatients(res.data);
    setMeta(res.meta);
    setLoading(false);
  };

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

  return { patients, addPatient, updatePatient, fetchPatients, deletePatient };
}
