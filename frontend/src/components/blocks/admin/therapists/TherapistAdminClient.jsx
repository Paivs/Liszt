"use client";

import { useState, useRef } from "react";
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
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import Pagination from "@/components/ui/pagination-1";
import { useRouter } from "next/navigation";
import TherapistSearchBar from "@/components/TherapistSearchBar";

export default function TherapistAdminClient({ initialData, meta }) {
  const {
    therapists,
    addTherapist,
    deleteTherapist,
    updateTherapist,
    fetchTherapists,
    toggleStatus,
  } = useTherapists(initialData);

  const [selected, setSelected] = useState(null);

  const dialogCloseRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    crp: "",
  });

  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addTherapist(formData);
      toast.success("Terapeuta criado com sucesso");
      setFormData({
        name: "",
        email: "",
        phone: "",
        crp: "",
      });
    } catch (err) {
      toast.error("Erro ao criar terapeuta");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTherapist(selected.id, selected);
      toast.success("Terapeuta atualizado");
      dialogCloseRef.current?.click();
    } catch {
      toast.error("Erro ao atualizar terapeuta");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteTherapist(id);
      toast.success("Terapeuta removido");
    } catch (error) {
      toast.error("Erro ao remover terapeuta");
    }
  };

  const handleFilter = ({ search, filter }) => {
    fetchTherapists({ search, filter, page: 1 });
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleStatus(id);
      setSelected((prev) =>
        prev?.id === updated.id ? { ...prev, ...updated } : prev
      );
      toast.success("Status atualizado");
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  return (
    <>
      <div className="p-4 space-y-4 ">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Gerenciar Terapeutas</h2>
                <TherapistSearchBar onFilter={handleFilter}/>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Adicionar Terapeuta</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Novo Terapeuta</DialogTitle>
                  <DialogDescription>
                    Preencha os dados abaixo para cadastrar um novo terapeuta no
                    sistema.
                  </DialogDescription>
                  <form onSubmit={handleCreate}>
                    <Input
                      placeholder="Nome completo"
                      className="mb-2"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Email"
                      className="mb-2"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Telefone"
                      className="mb-2"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <Input
                      placeholder="CRP (opcional)"
                      className="mb-2"
                      value={formData.crp}
                      onChange={(e) =>
                        setFormData({ ...formData, crp: e.target.value })
                      }
                    />
                    <DialogClose
                      ref={dialogCloseRef}
                      className="hidden"
                    ></DialogClose>
                    <Button type="submit">Criar</Button>
                  </form>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Verificado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {therapists && therapists.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.phone || "-"}</TableCell>
                    <TableCell>{t.crp || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-1 ${
                          t.deactivated_at ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></span>
                      {t.deactivated_at ? "Inativo" : "Ativo"}
                    </TableCell>
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
                          <DialogDescription>
                            Veja abaixo os dados completos do terapeuta
                            selecionado.
                          </DialogDescription>
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
                          <DialogDescription>
                            Edite os dados do terapeuta e salve as alterações ao
                            final.
                          </DialogDescription>
                          <form onSubmit={handleUpdate}>
                            <div className="flex items-center gap-2 mb-4">
                              <Switch
                                id="status"
                                checked={!selected?.deactivated_at}
                                onCheckedChange={() =>
                                  handleToggleStatus(selected.id)
                                }
                              />
                              <label htmlFor="status">
                                {selected?.deactivated_at ? "Inativo" : "Ativo"}
                              </label>
                            </div>
                            <Input
                              defaultValue={selected?.name}
                              className="mb-2"
                              onChange={(e) =>
                                setSelected((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                            <Input
                              defaultValue={selected?.email}
                              className="mb-2"
                              onChange={(e) =>
                                setSelected((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                            <Input
                              defaultValue={selected?.phone}
                              className="mb-2"
                              onChange={(e) =>
                                setSelected((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                            />
                            <Input
                              defaultValue={selected?.crp}
                              className="mb-2"
                              onChange={(e) =>
                                setSelected((prev) => ({
                                  ...prev,
                                  crp: e.target.value,
                                }))
                              }
                            />
                            <DialogClose
                              ref={dialogCloseRef}
                              className="hidden"
                            ></DialogClose>
                            <Button type="submit">Salvar</Button>
                          </form>
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
                          <DialogDescription>
                            Essa ação não poderá ser desfeita.
                          </DialogDescription>
                          <p>{selected?.name}</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <DialogClose
                              ref={dialogCloseRef}
                              className="hidden"
                            ></DialogClose>
                            <Button variant="ghost">Cancelar</Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(selected.id)}
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
