// lib/auth.js
import { api } from "./api";

export async function createAppointment(therapist_id, scheduled_time, type_appointment, obs){
  return await api.post("appointment", {therapist_id, scheduled_time, type_appointment, obs})
}

export async function getAllAppointments(){
  return await api.get("appointment")
}

export async function getAllAppointmentsByUser(){
  return await api.get("appointment")
}

export async function deleteAppointment(id){
  return await api.del(`appointment/${id}`)
}