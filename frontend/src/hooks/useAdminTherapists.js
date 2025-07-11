// lib/hooks/useAdminTherapists.js
import { api } from "@/lib/api";
import { useState } from "react";

export function useTherapists(initialData = [], initialMeta = {}) {
  const [therapists, setTherapists] = useState(initialData);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const fetchTherapists = async ({ page = 1, limit = 10, search = "", filter = "all" }) => {
    setLoading(true);    

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);
    if (search) params.set("search", search);
    if (filter && filter !== "all") params.set("filter", filter);

    const res = await api.get(`/therapists/paginate?${params.toString()}`);

    setTherapists(res.data);
    setMeta(res.meta);
    setLoading(false);
  };

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
    await api.del(`therapists/${id}`);
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
    meta,
    loading,
    fetchTherapists,
    addTherapist,
    updateTherapist,
    deleteTherapist,
    toggleStatus,
  };
}
