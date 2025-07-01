"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ConfirmDeleteModal({
  paciente,
  isOpen,
  onConfirm,
  onCancel,
}) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onCancel}>
        <DialogContent className="glass-effect border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o paciente{" "}
              <strong>{paciente?.name}</strong>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onCancel} className="mr-2">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onConfirm(paciente.id);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
