import { api } from "@/lib/api";
import { useState, useCallback } from "react";

export default function usePatientJournal(initialJournal = []) {
  const [journal, setJournal] = useState(initialJournal);

  const fetchJournals = useCallback(async () => {
    try {
      const data = await api.get("journal/emotion");
      setJournal(data || []);
      return data;
    } catch (err) {
      console.error(err);
      setJournal([]);
    }
  }, []);

  const createJournal = useCallback(
    async (date, mood, intensity, emotion_trigger, description) => {
      try {
        const novo = await api.post("journal/emotion", {
          date,
          mood,
          intensity,
          emotion_trigger,
          description,
        });

        setJournal((prev) => [...prev, novo.emotion]);
        return novo;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const deleteJournal = useCallback(async (id) => {
    try {
      await api.del(`journal/emotion/${id}`);
      setJournal((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    journal,
    setJournal,
    fetchJournals,
    createJournal,
    deleteJournal,
  };
}
