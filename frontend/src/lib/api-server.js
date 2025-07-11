//@/lib/api-server.js
import { cookies } from "next/headers";
import { ProfileIncompleteError, UnauthorizedError } from "./errors";

async function apiFetchServer(path, options = {}) {
  const cookiesStore = await cookies(); 
  const token = cookiesStore.get("token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new UnauthorizedError();
  }

  const data = await res.json();

  if (res.status === 403 && data?.code === "PROFILE_INCOMPLETE") {

    throw new ProfileIncompleteError();
  }

  if (!res.ok) {
    let errorMessage = "Erro na requisição do servidor.";
    try {
      const err = data;
      console.log(err);

      if (err?.message) errorMessage = err.message;
    } catch {
      // fallback
    }
    throw new Error(errorMessage);
  }

  return data;
}

export const apiServer = {
  get: (path) => apiFetchServer(path),
  post: (path, body) =>
    apiFetchServer(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    apiFetchServer(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  del: (path) =>
    apiFetchServer(path, {
      method: "DELETE",
    }),
};
