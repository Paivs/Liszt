// lib/api.js
import { toast } from "sonner";
import { redirectToLogin } from "./redirect";
import { redirectToCompleteRegister } from "./completeRegister";
import { ProfileIncompleteError } from "./errors";

export function getTokenFromCookie(ctx) {
  if (ctx && ctx.req) {
    const cookie = ctx.req.headers.cookie || "";
    const match = cookie.match(/(^|;)\s*token=([^;]*)/);
    return match ? match[2] : null;
  } else if (typeof window !== "undefined") {
    const match = document.cookie.match(/(^|;)\s*token=([^;]*)/);
    return match ? match[2] : null;
  }
  return null;
}

export async function apiFetch(path, options = {}) {
  const token = getTokenFromCookie();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/${path}`,
      {
        ...options,
        headers,
      }
    );

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (response.status === 403 && data?.code === "PROFILE_INCOMPLETE") {
      throw new ProfileIncompleteError();
    }

    if (response.status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");
      document.cookie = "token=; Max-Age=0; path=/";
      setTimeout(() => redirectToLogin(), 2500);
      return null;
    }

    if (!response.ok) {
      if (data?.message) {
        console.log(data.message);
      } else if (data?.errors) {
        console.log(data.errors);
      } else {
        console.log(`Erro ${response.status}`);
      }
      return data ?? { error: true };
    }

    return data;
  } catch (err) {
    if (!err.handled) {
      console.error("Erro inesperado no apiFetch:", err);
    }
    return { error: true, message: err.message };
  }
}

// Atalhos para métodos comuns
export const api = {
  get: (path) => apiFetch(path),
  post: (path, body) =>
    apiFetch(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    apiFetch(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  del: (path) =>
    apiFetch(path, {
      method: "DELETE",
    }),
};
