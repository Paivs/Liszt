// lib/redirect.js
"use client";
import { useRouter } from "next/navigation";

export let redirectToLogin = () => {
  console.warn("redirectToLogin não inicializado.");
};

export function RedirectProvider() {
  const router = useRouter();

  redirectToLogin = () => {
    router.push("/login");
  };

  return null;
}
