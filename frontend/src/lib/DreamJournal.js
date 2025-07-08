// lib/DreamJournal.js
import { api } from "./api";
export async function createDreamJournal(
  date,
  title,
  dream_description,
  emotions_list,
  symbols_list,
  clarity
) {
  return await api.post("journal/dream", {
    date,
    category,
    title,
    dream_description,
    emotions_list,
    symbols_list,
    clarity,
  });
}

export async function getAllJournals() {
  return await api.get("journal/dream");
}

export async function deleteJournal(id) {
  return await api.del("journal/dream/" + id);
}
