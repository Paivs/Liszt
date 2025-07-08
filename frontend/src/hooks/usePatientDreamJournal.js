import { useState, useCallback } from "react";
import { api } from "@/lib/api";

export default function usePatientJournal(initialJournal = []) {
  const [journal, setJournal] = useState(initialJournal);

  const fetchJournals = useCallback(async () => {
    const data = await api.get("journal/dream");
    setJournal(data || []);
    return data;
  }, []);

  const createJournal = useCallback(async (
    date,
    category,
    title,
    dream_description,
    emotions_list,
    symbols_list,
    clarity
  ) => {
    const res = await api.post("journal/dream", {
      date,
      category,
      title,
      dream_description,
      emotions_list,
      symbols_list,
      clarity,
    });

    if (res?.dream) {
      setJournal((prev) => [...prev, res.dream]);
    }

    return res;
  }, []);

  const deleteJournal = useCallback(async (id) => {
    await api.del(`journal/dream/${id}`);
    setJournal((prev) => prev.filter((j) => j.id !== id));
  }, []);

  return {
    journal,
    setJournal,
    fetchJournals,
    createJournal,
    deleteJournal,
  };
}
