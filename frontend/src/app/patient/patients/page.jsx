"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, Trash2, Edit3, Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllPatient, createPatient, deletePatient } from "@/lib/patient"; // ajuste o path se necessário
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import PacienteDescricaoModal from "./describePatient";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TerapeutaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });
  const [editandoPaciente, setEditandoPaciente] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  // Estado para controle da modal de confirmação de remoção
  const [pacienteParaRemover, setPacienteParaRemover] = useState(null);

  async function fetchPacientes() {
    try {
      const response = await getAllPatient();
      setPacientes(response);
    } catch (err) {
      toast.error("Erro ao carregar pacientes.");
    }
  }

  useEffect(() => {
    fetchPacientes();
  }, []);

  const salvarPacientes = (novosPacientes) => {
    setPacientes(novosPacientes);
  };

  const handleAddPaciente = async (e) => {
    e.preventDefault();

    if (
      !novoPaciente.name ||
      !novoPaciente.email ||
      !novoPaciente.cpf ||
      !novoPaciente.address ||
      !novoPaciente.emergency_contact_name ||
      !novoPaciente.emergency_contact_phone
    ) {
      toast.error("Erro", {
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPatient(
        novoPaciente.name,
        novoPaciente.cpf,
        novoPaciente.email,
        novoPaciente.phone,
        novoPaciente.emergency_contact_name,
        novoPaciente.emergency_contact_phone,
        novoPaciente.address
      );

      toast.success("Paciente adicionado com sucesso!");

      // Atualiza a lista
      const updated = await getAllPatient();
      setPacientes(updated.data);

      // Limpa formulário
      setNovoPaciente({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
      });
    } catch (err) {
      toast.error("Erro ao adicionar paciente.");
    }
  };

  const handleEditPaciente = (e) => {
    e.preventDefault();
    if (!editandoPaciente.name || !editandoPaciente.email) {
      toast.error("Erro", {
        description: "name e email são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    salvarPacientes(
      pacientes.map((p) =>
        p.id === editandoPaciente.id ? editandoPaciente : p
      )
    );
    toast.success("Sucesso!", { description: "Paciente atualizado." });
    setEditandoPaciente(null);
  };

  // Aqui só abre a modal, não remove ainda
  const solicitarRemocaoPaciente = (paciente) => {
    setPacienteParaRemover(paciente);
  };

  // Função que realmente remove o paciente após confirmação
  async function confirmarRemocaoPaciente(id){
    try{
      await deletePatient(id)
      setPacienteParaRemover(null);
      toast("Paciente removido", { description: "O paciente foi removido." });
      fetchPacientes();
    }catch(error){
      toast.error("Erro ao remover paciente")
    }
  };

  const iniciarEdicao = (paciente) => {
    setEditandoPaciente({ ...paciente });
  };

  const visualizarPaciente = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  const pacientesFiltrados =
    pacientes &&
    pacientes.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Users className="mr-3 h-10 w-10" /> Gerenciamento de Pacientes
          </h1>
          <p className="text-white/80 text-lg">
            Adicione, edite e visualize informações dos seus pacientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>
                    {editandoPaciente
                      ? "Editar Paciente"
                      : "Adicionar Novo Paciente"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={
                    editandoPaciente ? handleEditPaciente : handleAddPaciente
                  }
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      value={
                        editandoPaciente
                          ? editandoPaciente.name
                          : novoPaciente.name
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              name: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              name: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf" className="text-white">
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      value={
                        editandoPaciente
                          ? editandoPaciente.cpf
                          : novoPaciente.cpf
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              cpf: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              cpf: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={
                        editandoPaciente
                          ? editandoPaciente.email
                          : novoPaciente.email
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              email: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              email: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      value={
                        editandoPaciente
                          ? editandoPaciente.phone
                          : novoPaciente.phone
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              phone: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              phone: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white">
                      Endereço
                    </Label>
                    <Input
                      id="address"
                      value={
                        editandoPaciente
                          ? editandoPaciente.address
                          : novoPaciente.address
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              address: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              address: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="emergency_contact_name"
                      className="text-white"
                    >
                       do Contato de Emergência
                    </Label>
                    <Input
                      id="emergency_contact_name"
                      value={
                        editandoPaciente
                          ? editandoPaciente.emergency_contact_name
                          : novoPaciente.emergency_contact_name
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              emergency_contact_name: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              emergency_contact_name: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="emergency_contact_phone"
                      className="text-white"
                    >
                      phone do Contato de Emergência
                    </Label>
                    <Input
                      id="emergency_contact_phone"
                      value={
                        editandoPaciente
                          ? editandoPaciente.emergency_contact_phone
                          : novoPaciente.emergency_contact_phone
                      }
                      onChange={(e) =>
                        editandoPaciente
                          ? setEditandoPaciente({
                              ...editandoPaciente,
                              emergency_contact_phone: e.target.value,
                            })
                          : setNovoPaciente({
                              ...novoPaciente,
                              emergency_contact_phone: e.target.value,
                            })
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    variant="default"
                  >
                    {editandoPaciente ? "Salvar" : "Adicionar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Listagem dos pacientes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect border-white/20 text-white">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Pacientes</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Buscar pacientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    size={20}
                  />
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="max-h-[70vh] overflow-auto">
                {pacientesFiltrados && pacientesFiltrados.length === 0 && (
                  <p className="text-white/60 text-center mt-6">
                    Nenhum paciente encontrado.
                  </p>
                )}

                <ul className="divide-y divide-white/10">
                  {pacientesFiltrados &&
                    pacientesFiltrados.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">
                            {p.name}
                          </span>
                          <span className="text-white/70 text-sm">
                            {p.email}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => visualizarPaciente(p)}
                            className="text-white/70 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => iniciarEdicao(p)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => solicitarRemocaoPaciente(p)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <PacienteDescricaoModal
          paciente={pacienteSelecionado}
          isOpen={!!pacienteSelecionado}
          onClose={() => setPacienteSelecionado(null)}
        />

        {/* Modal de confirmação para remoção */}
        <ConfirmDeleteModal
          paciente={pacienteParaRemover}
          isOpen={!!pacienteParaRemover}
          onConfirm={confirmarRemocaoPaciente}
          onCancel={() => setPacienteParaRemover(null)}
        />
      </div>
    </div>
  );
};

export default TerapeutaPacientes;
