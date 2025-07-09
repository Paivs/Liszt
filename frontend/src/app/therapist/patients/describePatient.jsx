import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PacienteDescricaoModal = ({ paciente, isOpen, onClose }) => {
  if (!paciente) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>{paciente.name}</DialogTitle>
          <DialogDescription>
            CPF: {paciente.cpf || "Não informado"}
            <br />
            Email: {paciente.email || "Não informado"}
            <br />
            Telefone: {paciente.phone || "Não informado"}
            <br />
            Endereço: {paciente.address || "Não informado"}
            <br />
            <br />
            Contato de Emergência:
            <br />
            Nome:{" "}
            {paciente.emergency_contact_name || "Não informado"}
            <br />
            Telefone:{" "}
            {paciente.emergency_contact_phone || "Não informado"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PacienteDescricaoModal;
