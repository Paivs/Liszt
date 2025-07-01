// lib/patient.js
import { api } from "./api";

export async function createPatient(
  name,
  cpf,
  email,
  phone,
  emergency_contact_name,
  emergency_contact_phone,
  address
) {
  return await api.post("patient", {
    name,
    cpf,
    email,
    phone,
    emergency_contact_name,
    emergency_contact_phone,
    address,
  });
}

export async function getAllPatient() {
  return await api.get("patient");
}
export async function deletePatient(id) {
  return await api.del(`patient/${id}`);
}
