// lib/EmotionJournal.js
import { api } from "./api";
export async function createJournal(
  date,
  mood,
  intensity,
  emotion_trigger,
  description
) {
  return await api.post("journal/emotion", {
    date,
    mood,
    intensity,
    emotion_trigger,
    description,
  });
}

export async function getAllJournals() {
  return await api.get("journal/emotion");
}

export async function deleteJournal(id) {
  return await api.del("journal/emotion/" + id);
}
