// lib/journal.js
import { api } from "./api";
export async function createDreamJournal(
  date,
  type_appointment,
  clarity,
  title,
  dream_description,
  emotions_list,
  symbols_list
) {
  return await api.post("journal/dream", {
    date,
    type_appointment,
    clarity,
    title,
    dream_description,
    emotions_list,
    symbols_list,
  });
}

export async function fetchDreams(){
  return await api.get("journal/dream")
}