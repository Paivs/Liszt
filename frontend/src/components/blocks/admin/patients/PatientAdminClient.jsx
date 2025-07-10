"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { usePatients } from "@/hooks/useAdminPatients";
import { useRouter } from "next/navigation";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Eye } from "lucide-react";
import Pagination from "@/components/ui/pagination";

export default function PatientAdminClient({ initialData, meta }) {
  const { patients, addPatient, deletePatient, updatePatient } =
    usePatients(initialData);

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    address: "",
  });

  const patientSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    cpf: z.string().min(11, "CPF inválido").optional().or(z.literal("")),
    email: z.string().email("Email inválido"),
    phone: z.string().min(8, "Telefone inválido").optional().or(z.literal("")),
    emergency_contact_name: z.string().optional().or(z.literal("")),
    emergency_contact_phone: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
  });

  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  const handleCreate = async () => {
    try {
      const data = patientSchema.parse(form);
      await addPatient(data);
      toast.success("Paciente criado com sucesso");
      setForm({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        address: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Erro ao criar paciente");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const data = patientSchema.parse(form);
      await updatePatient(selected.id, data);
      toast.success("Paciente atualizado com sucesso");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Erro ao atualizar paciente");
      }
    }
  };

  const openEdit = (p) => {
    setSelected(p);
    setForm({
      name: p.name || "",
      cpf: p.cpf || "",
      email: p.email || "",
      phone: p.phone || "",
      emergency_contact_name: p.emergency_contact_name || "",
      emergency_contact_phone: p.emergency_contact_phone || "",
      address: p.address || "",
    });
  };

  return (
    <>
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
                  <DialogDescription>
                    Preencha os dados do novo paciente.
                  </DialogDescription>
                  {Object.entries(form).map(([key, value]) => (
                    <Input
                      key={key}
                      placeholder={key.replace(/_/g, " ")}
                      className="mb-2"
                      value={value}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                    />
                  ))}
                  <Button onClick={handleCreate}>Criar</Button>
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
                      {/* Visualizar */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelected(p)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Detalhes do Paciente</DialogTitle>
                          <DialogDescription>
                            Informações completas do paciente:
                          </DialogDescription>
                          <div className="space-y-1">
                            <p>
                              <strong>Nome:</strong> {p.name}
                            </p>
                            <p>
                              <strong>CPF:</strong> {p.cpf || "-"}
                            </p>
                            <p>
                              <strong>Email:</strong> {p.email}
                            </p>
                            <p>
                              <strong>Telefone:</strong> {p.phone || "-"}
                            </p>
                            <p>
                              <strong>Contato de Emergência:</strong>{" "}
                              {p.emergency_contact_name || "-"}
                            </p>
                            <p>
                              <strong>Telefone do Contato:</strong>{" "}
                              {p.emergency_contact_phone || "-"}
                            </p>
                            <p>
                              <strong>Endereço:</strong> {p.address || "-"}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Editar */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(p)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Editar Paciente</DialogTitle>
                          <DialogDescription>
                            Edite os dados do paciente e clique em salvar.
                          </DialogDescription>

                          <Input
                            placeholder="Nome completo"
                            className="mb-2"
                            value={form.name}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, name: e.target.value }))
                            }
                          />
                          <Input
                            placeholder="CPF"
                            className="mb-2"
                            value={form.cpf}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, cpf: e.target.value }))
                            }
                          />
                          <Input
                            placeholder="Email"
                            className="mb-2"
                            value={form.email}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, email: e.target.value }))
                            }
                          />
                          <Input
                            placeholder="Telefone"
                            className="mb-2"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, phone: e.target.value }))
                            }
                          />
                          <Input
                            placeholder="Nome do contato de emergência"
                            className="mb-2"
                            value={form.emergency_contact_name}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                emergency_contact_name: e.target.value,
                              }))
                            }
                          />
                          <Input
                            placeholder="Telefone do contato de emergência"
                            className="mb-2"
                            value={form.emergency_contact_phone}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                emergency_contact_phone: e.target.value,
                              }))
                            }
                          />
                          <Input
                            placeholder="Endereço (opcional)"
                            className="mb-2"
                            value={form.address}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                address: e.target.value,
                              }))
                            }
                          />

                          <Button onClick={handleUpdate}>Salvar</Button>
                        </DialogContent>
                      </Dialog>

                      {/* Remover */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => setSelected(p)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>
                            Deseja remover este paciente?
                          </DialogTitle>
                          <DialogDescription>
                            Esta ação é irreversível.
                          </DialogDescription>
                          <p>{selected?.name}</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost">Cancelar</Button>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                await deletePatient(selected.id);
                                setSelected(null);
                                toast.success("Paciente removido");
                              }}
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
      <Pagination
        currentPage={meta.currentPage}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
