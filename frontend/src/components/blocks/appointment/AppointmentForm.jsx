"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createAppointment } from "@/lib/appointment";

export default function AppointmentForm({ terapeutas, onAddAppointment }) {
  const [hoje] = useState(new Date().toISOString().split("T")[0]);
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
    try {
      const iso = `${data}T${horario}:00-03:00`;
      const novo = await createAppointment(terapeuta, iso, tipo, novoAgendamento.observacoes);
      toast("Sucesso!", { description: "Consulta agendada com sucesso!" });
      setNovoAgendamento({ data: "", horario: "", terapeuta: "", tipo: "", observacoes: "" });
      if (onAddAppointment) onAddAppointment(novo);
    } catch (err) {
      toast("Erro ao agendar", { description: "Tente novamente." });
    }
  };

  return (
    <Card className="glass-effect border-white/20 animate-fade-in-left">
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
              <Label htmlFor="data" className="text-white">Data *</Label>
              <Input id="data" type="date" value={novoAgendamento.data} onChange={(e) => setNovoAgendamento((prev) => ({ ...prev, data: e.target.value }))} className="bg-white/10 border-white/20 text-white" min={hoje} />
            </div>
            <div>
              <Label htmlFor="horario" className="text-white">Horário *</Label>
              <Select value={novoAgendamento.horario} onValueChange={(value) => setNovoAgendamento((prev) => ({ ...prev, horario: value }))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="terapeuta" className="text-white">Terapeuta *</Label>
            <Select value={novoAgendamento.terapeuta} onValueChange={(value) => setNovoAgendamento((prev) => ({ ...prev, terapeuta: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione o terapeuta" />
              </SelectTrigger>
              <SelectContent>
                {terapeutas.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipo" className="text-white">Tipo de Sessão *</Label>
            <Select value={novoAgendamento.tipo} onValueChange={(value) => setNovoAgendamento((prev) => ({ ...prev, tipo: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposSessao.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="observacoes" className="text-white">Observações</Label>
            <Textarea id="observacoes" value={novoAgendamento.observacoes} onChange={(e) => setNovoAgendamento((prev) => ({ ...prev, observacoes: e.target.value }))} placeholder="Observações adicionais..." className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">Agendar Consulta</Button>
        </form>
      </CardContent>
    </Card>
  );
} 