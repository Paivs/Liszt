// lib/auth.js
import { api } from "./api";

export async function loginUser(email, password, userType, caseCode) {
  const payload = {
    email,
    password,
    userType,
    ...(userType === "client" && { caseCode }),
  };

  const data = await api.post("auth/login", payload);

  // Salva token
  document.cookie = `token=${data.token}; path=/`;

  return data; // { token, user }
}

export function logoutUser() {
  document.cookie = "token=; Max-Age=0; path=/";
}


export async function registerUser(payload) {
  const data = await api.post("auth/register", payload);

  // Salva token
  document.cookie = `token=${data.token}; path=/`;

  return data; // { token, user }
}