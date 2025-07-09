"use client";

import { useState } from "react";
import { usePatients } from "@/hooks/useAdminPatients";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function PatientAdminClient({ initialData }) {
  const { patients, addPatient, deletePatient, updatePatient } = usePatients(initialData);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Gerenciar Pacientes</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Adicionar Paciente</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Novo Paciente</DialogTitle>
                <Input placeholder="Nome completo" className="mb-2" />
                <Input placeholder="Email" className="mb-2" />
                <Input placeholder="Telefone" className="mb-2" />
                <Button>Criar</Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone || "-"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Detalhar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelected(p)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Detalhes do Paciente</DialogTitle>
                        <p><strong>Nome:</strong> {selected?.name}</p>
                        <p><strong>Email:</strong> {selected?.email}</p>
                        <p><strong>Telefone:</strong> {selected?.phone || "-"}</p>
                      </DialogContent>
                    </Dialog>

                    {/* Editar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelected(p)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Editar Paciente</DialogTitle>
                        <Input defaultValue={selected?.name} className="mb-2" />
                        <Input defaultValue={selected?.email} className="mb-2" />
                        <Input defaultValue={selected?.phone} className="mb-2" />
                        <Button onClick={() => updatePatient(selected.id, { ...selected })}>Salvar</Button>
                      </DialogContent>
                    </Dialog>

                    {/* Remover */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setSelected(p)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Deseja remover este paciente?</DialogTitle>
                        <p>{selected?.name}</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="ghost">Cancelar</Button>
                          <Button variant="destructive" onClick={() => deletePatient(selected.id)}>Remover</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
