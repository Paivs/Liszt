// lib/auth.js
import { api } from "./api";

export async function getAllTherapists(){
  return await api.get("user/therapist")
}
