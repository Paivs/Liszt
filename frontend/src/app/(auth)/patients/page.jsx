"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Trash2, Edit3, Search, Eye } from 'lucide-react';
import { toast } from "sonner";
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


const TerapeutaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState({ nome: '', email: '', telefone: '', observacoes: '' });
  const [editandoPaciente, setEditandoPaciente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    const pacientesSalvos = localStorage.getItem('pacientes');
    if (pacientesSalvos) {
      setPacientes(JSON.parse(pacientesSalvos));
    }
  }, []);

  const salvarPacientes = (novosPacientes) => {
    localStorage.setItem('pacientes', JSON.stringify(novosPacientes));
    setPacientes(novosPacientes);
  };

  const handleAddPaciente = (e) => {
    e.preventDefault();
    if (!novoPaciente.nome || !novoPaciente.email) {
      toast({ title: "Erro", description: "Nome e email são obrigatórios.", variant: "destructive" });
      return;
    }
    const paciente = { id: Date.now(), ...novoPaciente };
    salvarPacientes([...pacientes, paciente]);
    toast({ title: "Sucesso!", description: "Paciente adicionado." });
    setNovoPaciente({ nome: '', email: '', telefone: '', observacoes: '' });
  };

  const handleEditPaciente = (e) => {
    e.preventDefault();
    if (!editandoPaciente.nome || !editandoPaciente.email) {
      toast({ title: "Erro", description: "Nome e email são obrigatórios.", variant: "destructive" });
      return;
    }
    salvarPacientes(pacientes.map(p => p.id === editandoPaciente.id ? editandoPaciente : p));
    toast({ title: "Sucesso!", description: "Paciente atualizado." });
    setEditandoPaciente(null);
  };

  const removerPaciente = (id) => {
    salvarPacientes(pacientes.filter(p => p.id !== id));
    toast({ title: "Paciente removido", description: "O paciente foi removido." });
  };

  const iniciarEdicao = (paciente) => {
    setEditandoPaciente({...paciente});
  };

  const visualizarPaciente = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Users className="mr-3 h-10 w-10" /> Gerenciamento de Pacientes
          </h1>
          <p className="text-white/80 text-lg">Adicione, edite e visualize informações dos seus pacientes.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>{editandoPaciente ? 'Editar Paciente' : 'Adicionar Novo Paciente'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editandoPaciente ? handleEditPaciente : handleAddPaciente} className="space-y-4">
                  <div><Label htmlFor="nome" className="text-white">Nome Completo *</Label><Input id="nome" value={editandoPaciente ? editandoPaciente.nome : novoPaciente.nome} onChange={(e) => editandoPaciente ? setEditandoPaciente({...editandoPaciente, nome: e.target.value}) : setNovoPaciente({...novoPaciente, nome: e.target.value})} className="bg-white/10 border-white/20 text-white" /></div>
                  <div><Label htmlFor="email" className="text-white">Email *</Label><Input id="email" type="email" value={editandoPaciente ? editandoPaciente.email : novoPaciente.email} onChange={(e) => editandoPaciente ? setEditandoPaciente({...editandoPaciente, email: e.target.value}) : setNovoPaciente({...novoPaciente, email: e.target.value})} className="bg-white/10 border-white/20 text-white" /></div>
                  <div><Label htmlFor="telefone" className="text-white">Telefone</Label><Input id="telefone" value={editandoPaciente ? editandoPaciente.telefone : novoPaciente.telefone} onChange={(e) => editandoPaciente ? setEditandoPaciente({...editandoPaciente, telefone: e.target.value}) : setNovoPaciente({...novoPaciente, telefone: e.target.value})} className="bg-white/10 border-white/20 text-white" /></div>
                  <div><Label htmlFor="observacoes" className="text-white">Observações</Label><Textarea id="observacoes" value={editandoPaciente ? editandoPaciente.observacoes : novoPaciente.observacoes} onChange={(e) => editandoPaciente ? setEditandoPaciente({...editandoPaciente, observacoes: e.target.value}) : setNovoPaciente({...novoPaciente, observacoes: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" /></div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">{editandoPaciente ? 'Salvar Alterações' : 'Adicionar Paciente'}</Button>
                  {editandoPaciente && <Button variant="outline" onClick={() => setEditandoPaciente(null)} className="w-full mt-2 bg-transparent text-white border-white/30 hover:bg-white/10">Cancelar Edição</Button>}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2"><Users className="h-5 w-5" /><span>Lista de Pacientes</span></div>
                  <div className="relative w-1/2">
                    <Input type="text" placeholder="Buscar paciente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10" />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {pacientesFiltrados.length === 0 ? (
                    <div className="text-center py-8"><Users className="h-12 w-12 text-white/50 mx-auto mb-4" /><p className="text-white/70">Nenhum paciente encontrado.</p></div>
                  ) : (
                    pacientesFiltrados.map(p => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{p.nome}</p>
                          <p className="text-white/70 text-sm">{p.email}</p>
                          {p.telefone && <p className="text-white/60 text-xs">{p.telefone}</p>}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => visualizarPaciente(p)} className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => iniciarEdicao(p)} className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/20"><Edit3 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => removerPaciente(p.id)} className="text-red-300 hover:text-red-200 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {pacienteSelecionado && (
          <Dialog open={!!pacienteSelecionado} onOpenChange={() => setPacienteSelecionado(null)}>
            <DialogContent className="glass-effect border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">{pacienteSelecionado.nome}</DialogTitle>
                <DialogDescription className="text-white/70">Detalhes do Paciente</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                <p><strong>Email:</strong> {pacienteSelecionado.email}</p>
                <p><strong>Telefone:</strong> {pacienteSelecionado.telefone || 'Não informado'}</p>
                <p><strong>Observações:</strong></p>
                <p className="bg-white/5 p-3 rounded-md text-sm">{pacienteSelecionado.observacoes || 'Nenhuma observação.'}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default TerapeutaPacientes;