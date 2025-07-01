"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
// Importe ou implemente a função que envia o e-mail de recuperação
import { sendPasswordResetEmail } from "@/lib/auth"; // <-- você deve implementar isso

export default function ForgotPasswordForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(email);

      toast.success("E-mail de recuperação enviado!", {
        description: "Verifique sua caixa de entrada.",
        duration: 3000,
      });

      setEmail(""); // limpa o campo
    } catch (err) {
      setError(err.message || "Erro ao enviar e-mail de recuperação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="fulano@dominio.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar link de recuperação"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Lembrou sua senha?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}
