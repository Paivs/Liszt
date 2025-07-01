"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteAppointment } from "@/lib/appointment";

function formatarHorario(isoString) {
  const date = new Date(isoString);
  const horas = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  return `${horas}:${minutos}`;
}

function formatarData(dataString) {
  return new Date(dataString).toLocaleDateString("pt-BR");
}

export default function AppointmentList({ agendamentos, onRemoveAppointment }) {
  const removerAgendamento = async (id) => {
    try {
      await deleteAppointment(id);
      toast("Agendamento removido", {
        description: "O agendamento foi removido com sucesso.",
      });
      if (onRemoveAppointment) onRemoveAppointment(id);
    } catch (err) {
      toast("Erro", {
        description: "Falha ao remover agendamento.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-effect border-white/20 animate-fade-in-right">
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
              .map((ag, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 space-y-2 transition-all duration-300 hover:scale-[1.01] hover:bg-white/20"
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
                        {ag.User && <span>{ag.User.name}</span>}
                      </div>
                      <p className="text-white/70 text-sm mt-1">{ag.tipo}</p>
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
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
