"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { registerFullUser, registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Registerfull({ className, ...props }) {
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [emergency_contact_name, setEmergencyContactName] = useState("");
  const [emergency_contact_phone, setEmergencyContactPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerFullUser({
        phone,
        cpf,
        emergency_contact_name,
        emergency_contact_phone,
        address,
      });

      toast.success(`Conta atualizada!`, {
        duration: 1900,
      });

      setTimeout(() => {
        router.push("/patient/dashboard");
      }, 2000);
    } catch (err) {
      console.log(JSON.stringify(err));
      toast.error(`Erro ao finalizar a conta!`, {
        duration: 1900,
      });
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
        <h1 className="text-2xl font-bold">Informações Pessoais</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Preencha as informações abaixo para completar seu cadastro.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(xx) xxxxx-xxxx"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número, bairro, cidade"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="emergency_contact_name">
            Nome do Contato de Emergência
          </Label>
          <Input
            id="emergency_contact_name"
            type="text"
            value={emergency_contact_name}
            onChange={(e) => setEmergencyContactName(e.target.value)}
            placeholder="Nome do contato"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="emergency_contact_phone">
            Telefone do Contato de Emergência
          </Label>
          <Input
            id="emergency_contact_phone"
            type="tel"
            value={emergency_contact_phone}
            onChange={(e) => setEmergencyContactPhone(e.target.value)}
            placeholder="(xx) xxxxx-xxxx"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Atualizar dados"}
        </Button>
      </div>
    </form>
  );
}
