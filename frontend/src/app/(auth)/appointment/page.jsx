"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const Agendamento = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    data: '',
    horario: '',
    terapeuta: '',
    tipo: '',
    observacoes: ''
  });

  const terapeutas = [
    'Dra. Sofia Mendes',
    'Dr. Rafael Costa',
    'Dra. Ana Paula Silva',
    'Dr. Carlos Oliveira'
  ];

  const tiposSessao = [
    'Consulta Individual',
    'Terapia de Casal',
    'Terapia Familiar',
    'Avaliação Psicológica'
  ];

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    const agendamentosSalvos = localStorage.getItem('agendamentos');
    if (agendamentosSalvos) {
      setAgendamentos(JSON.parse(agendamentosSalvos));
    }
  }, []);

  const salvarAgendamentos = (novosAgendamentos) => {
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
    setAgendamentos(novosAgendamentos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!novoAgendamento.data || !novoAgendamento.horario || !novoAgendamento.terapeuta || !novoAgendamento.tipo) {
      toast("Erro", {
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const agendamento = {
      id: Date.now(),
      ...novoAgendamento,
      status: 'agendado'
    };

    const novosAgendamentos = [...agendamentos, agendamento];
    salvarAgendamentos(novosAgendamentos);

    toast("Sucesso!", {
      description: "Consulta agendada com sucesso!"
    });

    setNovoAgendamento({
      data: '',
      horario: '',
      terapeuta: '',
      tipo: '',
      observacoes: ''
    });
  };

  const removerAgendamento = (id) => {
    const novosAgendamentos = agendamentos.filter(ag => ag.id !== id);
    salvarAgendamentos(novosAgendamentos);
    
    toast("Agendamento removido", {
      description: "O agendamento foi removido com sucesso."
    });
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

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
                      <Label htmlFor="data" className="text-white">Data *</Label>
                      <Input
                        id="data"
                        type="date"
                        value={novoAgendamento.data}
                        onChange={(e) => setNovoAgendamento({...novoAgendamento, data: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="horario" className="text-white">Horário *</Label>
                      <Select value={novoAgendamento.horario} onValueChange={(value) => setNovoAgendamento({...novoAgendamento, horario: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horarios.map(horario => (
                            <SelectItem key={horario} value={horario}>{horario}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="terapeuta" className="text-white">Terapeuta *</Label>
                    <Select value={novoAgendamento.terapeuta} onValueChange={(value) => setNovoAgendamento({...novoAgendamento, terapeuta: value})}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o terapeuta" />
                      </SelectTrigger>
                      <SelectContent>
                        {terapeutas.map(terapeuta => (
                          <SelectItem key={terapeuta} value={terapeuta}>{terapeuta}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tipo" className="text-white">Tipo de Sessão *</Label>
                    <Select value={novoAgendamento.tipo} onValueChange={(value) => setNovoAgendamento({...novoAgendamento, tipo: value})}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposSessao.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="observacoes" className="text-white">Observações</Label>
                    <Textarea
                      id="observacoes"
                      value={novoAgendamento.observacoes}
                      onChange={(e) => setNovoAgendamento({...novoAgendamento, observacoes: e.target.value})}
                      placeholder="Observações adicionais..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Agendar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

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
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {agendamentos.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Nenhuma consulta agendada</p>
                    </div>
                  ) : (
                    agendamentos
                      .sort((a, b) => new Date(a.data) - new Date(b.data))
                      .map((agendamento) => (
                        <motion.div
                          key={agendamento.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/10 rounded-lg p-4 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 text-white font-medium">
                                <Calendar className="h-4 w-4" />
                                <span>{formatarData(agendamento.data)}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{agendamento.horario}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-white/80 mt-1">
                                <User className="h-4 w-4" />
                                <span>{agendamento.terapeuta}</span>
                              </div>
                              <p className="text-white/70 text-sm mt-1">{agendamento.tipo}</p>
                              {agendamento.observacoes && (
                                <p className="text-white/60 text-sm mt-2">{agendamento.observacoes}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removerAgendamento(agendamento.id)}
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
};

export default Agendamento;
