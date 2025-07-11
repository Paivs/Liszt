// lib/auth.js
import { api } from "./api";
import Cookies from "js-cookie";

export async function loginUser(email, password) {
  const data = await api.post("auth/login", { email, password });

  // Salva token
  Cookies.set("token", data.token, {
    path: "/",
    sameSite: "Lax",
    secure: true,
  });
  Cookies.set("perfil", data.user.role, {
    path: "/",
    sameSite: "Lax",
    secure: true,
  });

  return data; // { token, user }
}

export function logoutUser() {
  document.cookie = "token=; Max-Age=0; path=/";
}

export async function sendPasswordResetEmail(payload) {
  const data = await api.post("auth/reset-password", payload);
}

export async function registerUser(payload) {
  const data = await api.post("auth/register", payload);

  // Salva token
  document.cookie = `token=${data.token}; path=/`;

  return data; // { token, user }
}

export async function registerFullUser(payload) {
  const data = await api.post("auth/registerfull", payload);
  return data; // { token, user }
}
