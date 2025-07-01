"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getAllTherapists } from "@/lib/user";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
} from "@/lib/appointment";

export default function Agendamento() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [terapeutas, setTerapeutas] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    data: "",
    horario: "",
    terapeuta: "",
    tipo: "",
    observacoes: "",
  });

  const tiposSessao = [
    "Consulta Individual",
    "Terapia de Casal",
    "Terapia Familiar",
    "Avaliação Psicológica",
  ];

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  async function init() {
    const listaTerapeutas = await getAllTherapists();
    setTerapeutas(listaTerapeutas || []);
    const consultas = await getAllAppointments();
    setAgendamentos(consultas || []);
  }

  useEffect(() => {
    init();
  }, []);

  const salvarAgendamento = async () => {
    try {
      const iso = `${novoAgendamento.data}T${novoAgendamento.horario}:00-03:00`;

      const novo = await createAppointment(
        novoAgendamento.terapeuta,
        iso,
        novoAgendamento.tipo,
        novoAgendamento.observacoes
      );

      setAgendamentos((prev) => [...prev, novo]);
      toast("Sucesso!", { description: "Consulta agendada com sucesso!" });
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      toast("Erro ao agendar", { description: "Tente novamente." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, horario, terapeuta, tipo } = novoAgendamento;

    if (!data || !horario || !terapeuta || !tipo) {
      toast("Erro", {
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    await salvarAgendamento();
    setNovoAgendamento({
      data: "",
      horario: "",
      terapeuta: "",
      tipo: "",
      observacoes: "",
    });
  };

  const removerAgendamento = async (id) => {
    try {
      await deleteAppointment(id);
      toast("Agendamento removido", {
        description: "O agendamento foi removido com sucesso.",
      });
      await init();
    } catch (err) {
      toast("Erro", {
        description: "Falha ao remover agendamento.",
        variant: "destructive",
      });
    }
  };

  const formatarHorario = (isoString) => {
    const date = new Date(isoString);
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  };

  const formatarData = (dataString) =>
    new Date(dataString).toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Agendamento de Consultas
          </h1>
          <p className="text-white/80 text-lg">
            Gerencie suas sessões de psicoterapia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Nova Consulta</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data" className="text-white">
                        Data *
                      </Label>
                      <Input
                        id="data"
                        type="date"
                        value={novoAgendamento.data}
                        onChange={(e) =>
                          setNovoAgendamento((prev) => ({
                            ...prev,
                            data: e.target.value,
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="horario" className="text-white">
                        Horário *
                      </Label>
                      <Select
                        value={novoAgendamento.horario}
                        onValueChange={(value) =>
                          setNovoAgendamento((prev) => ({
                            ...prev,
                            horario: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horarios.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="terapeuta" className="text-white">
                      Terapeuta *
                    </Label>
                    <Select
                      value={novoAgendamento.terapeuta}
                      onValueChange={(value) =>
                        setNovoAgendamento((prev) => ({
                          ...prev,
                          terapeuta: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o terapeuta" />
                      </SelectTrigger>
                      <SelectContent>
                        {terapeutas.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tipo" className="text-white">
                      Tipo de Sessão *
                    </Label>
                    <Select
                      value={novoAgendamento.tipo}
                      onValueChange={(value) =>
                        setNovoAgendamento((prev) => ({ ...prev, tipo: value }))
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposSessao.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="observacoes" className="text-white">
                      Observações
                    </Label>
                    <Textarea
                      id="observacoes"
                      value={novoAgendamento.observacoes}
                      onChange={(e) =>
                        setNovoAgendamento((prev) => ({
                          ...prev,
                          observacoes: e.target.value,
                        }))
                      }
                      placeholder="Observações adicionais..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Agendar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lista de agendamentos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Próximas Consultas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto p-1">
                  {agendamentos && agendamentos.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Nenhuma consulta agendada</p>
                    </div>
                  ) : (
                    agendamentos
                      .sort((a, b) => new Date(a.data) - new Date(b.data))
                      .map((ag) => (
                        <motion.div
                          key={ag.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/10 rounded-lg p-4 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 text-white font-medium">
                                <Calendar className="h-4 w-4" />
                                <span>{formatarData(ag.scheduled_time)}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{formatarHorario(ag.scheduled_time)}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-white/80 mt-1">
                                <User className="h-4 w-4" />
                                <span>{ag.User.name}</span>
                              </div>
                              <p className="text-white/70 text-sm mt-1">
                                {ag.tipo}
                              </p>
                              {ag.observacoes && (
                                <p className="text-white/60 text-sm mt-2">
                                  {ag.observacoes}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removerAgendamento(ag.id)}
                              className="text-red-300 hover:text-red-200 hover:bg-red-500/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
