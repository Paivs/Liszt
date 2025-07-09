"use client";

import { useState } from "react";
import { useTherapists } from "@/hooks/useAdminTherapists";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function TherapistAdminClient({ initialData }) {
  const { therapists, addTherapist, deleteTherapist, updateTherapist } =
    useTherapists(initialData);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4 space-y-4 min-h-[calc(100vh-70px)]">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Gerenciar Terapeutas</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Adicionar Terapeuta</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Novo Terapeuta</DialogTitle>
                <Input placeholder="Nome completo" className="mb-2" />
                <Input placeholder="Email" className="mb-2" />
                <Input placeholder="Telefone" className="mb-2" />
                <Input placeholder="CRP (opcional)" className="mb-2" />
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
                <TableHead>CRP</TableHead>
                <TableHead>Verificado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {therapists.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.phone || "-"}</TableCell>
                  <TableCell>{t.crp || "-"}</TableCell>
                  <TableCell>{t.verified ? "Sim" : "Não"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Detalhar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelected(t)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Detalhes do Terapeuta</DialogTitle>
                        <p>
                          <strong>Nome:</strong> {selected?.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {selected?.email}
                        </p>
                        <p>
                          <strong>Telefone:</strong> {selected?.phone || "-"}
                        </p>
                        <p>
                          <strong>CRP:</strong> {selected?.crp || "-"}
                        </p>
                        <p>
                          <strong>Verificado:</strong>{" "}
                          {selected?.verified ? "Sim" : "Não"}
                        </p>
                      </DialogContent>
                    </Dialog>

                    {/* Editar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelected(t)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Editar Terapeuta</DialogTitle>
                        <Input defaultValue={selected?.name} className="mb-2" />
                        <Input
                          defaultValue={selected?.email}
                          className="mb-2"
                        />
                        <Input
                          defaultValue={selected?.phone}
                          className="mb-2"
                        />
                        <Input defaultValue={selected?.crp} className="mb-2" />
                        <Button
                          onClick={() =>
                            updateTherapist(selected.id, { ...selected })
                          }
                        >
                          Salvar
                        </Button>
                      </DialogContent>
                    </Dialog>

                    {/* Remover */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => setSelected(t)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>
                          Deseja remover este terapeuta?
                        </DialogTitle>
                        <p>{selected?.name}</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <DialogClose asChild>
                            <Button variant="ghost">Cancelar</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => deleteTherapist(selected.id)}
                          >
                            Remover
                          </Button>
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
