//@/hooks/usePatientEmotionJournal.js
import { useState, useCallback } from "react";
import { createJournal as apiCreate, getAllJournals, deleteJournal as apiDelete } from "@/lib/EmotionJournal";

export default function usePatientJournal(initialJournal = []) {
  const [journal, setJournal] = useState(initialJournal);

  // Adiciona um novo agendamento ao estado local
  const addJournal = useCallback((novo) => {
    setJournal((prev) => [...prev, novo]);
  }, []);

  // Remove um agendamento do estado local
  const removeJournal = useCallback((id) => {
    setJournal((prev) => prev.filter((ag) => ag.id !== id));
  }, []);

  // Busca todos os journal do backend e atualiza o estado
  const fetchJournals = useCallback(async () => {
    const data = await getAllJournals();
    setJournal(data || []);
    return data;
  }, []);

  // Cria um novo agendamento via API e atualiza o estado
  const create = useCallback(async (date, mood, intensity, emotion_trigger, description) => {
    const novo = await apiCreate(date, mood, intensity, emotion_trigger, description);
    setJournal((prev) => [...prev, novo.emotion]);
    return novo;
  }, []);

  // Remove um agendamento via API e atualiza o estado
  const remove = useCallback(async (id) => {
    await apiDelete(id);
    setJournal((prev) => prev.filter((ag) => ag.id !== id));
  }, []);

  return {
    journal,
    setJournal,
    addJournal,
    removeJournal,
    fetchJournals,
    createJournal: create,
    deleteJournal: remove,
  };
} 