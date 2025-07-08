"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { ZodError } from "zod";

export function usePatientSettings({ schema, endpoint, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const parsed = schema.parse(formData); // valida com Zod
      const response = await api.put(endpoint, parsed);

      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success("Alterações salvas com sucesso.");
      }

      if (onSuccess) onSuccess(response);
    } catch (error) {
      if (error instanceof ZodError) {
        const mensagens = error.errors
          .map((err) => `• ${err.message}`)
          .join("\n");

        toast.error("Erro na validação", {
          description: (
            <div className="whitespace-pre-line text-left">{mensagens}</div>
          ),
          variant: "destructive",
          duration: 7000,
        });
      } else {
        toast.error("Erro ao salvar dados.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
