// lib/completeRegister.js
"use client";
import { useRouter } from "next/navigation";

export let redirectToCompleteRegister = () => {
  console.warn("redirectToCompleteRegister não inicializado.");
};

export function RedirectCompleteRegisterProvider() {
  const router = useRouter();

  redirectToCompleteRegister = () => {
    router.push("/patient/registerfull");
  };

  return null;
}
