"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Moon, Plus, Trash2, Star, Cloud } from "lucide-react";
import { toast } from "sonner";
import usePatientJournal from "@/hooks/usePatientDreamJournal";

export default function Dreams() {
  const {
    journal: sonhos,
    fetchJournals,
    createJournal,
    deleteJournal,
  } = usePatientJournal([]);

  const [novoSonho, setNovoSonho] = useState({
    data: new Date().toISOString().split("T")[0],
    titulo: "",
    descricao: "",
    emocoesSonho: "",
    simbolos: "",
    clareza: "",
    categoria: "",
  });

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const categoriasSonho = [
    "Pesadelo", "Sonho Lúcido", "Sonho Recorrente",
    "Sonho Profético", "Sonho Comum", "Sonho Simbólico"
  ];

  const nivelClareza = [
    "Muito Vago", "Vago", "Moderado", "Claro", "Muito Claro"
  ];

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case "Pesadelo": return "😱";
      case "Sonho Lúcido": return "🌟";
      case "Sonho Recorrente": return "🔄";
      case "Sonho Profético": return "🔮";
      case "Sonho Simbólico": return "🎭";
      default: return "💭";
    }
  };

  const getClarezaColor = (clareza) => {
    switch (clareza) {
      case "Muito Vago": return "text-gray-400";
      case "Vago": return "text-blue-400";
      case "Moderado": return "text-yellow-400";
      case "Claro": return "text-orange-400";
      case "Muito Claro": return "text-green-400";
      default: return "text-white";
    }
  };

  const formatarData = (data) => new Date(data).toLocaleDateString("pt-BR");

  const handleSonhoSubmit = async (e) => {
    e.preventDefault();

    if (!novoSonho.titulo || !novoSonho.descricao) {
      toast("Erro", {
        description: "Preencha título e descrição do sonho.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createJournal(
        null, // therapist_id (se aplicável)
        novoSonho.data,
        novoSonho.categoria,
        {
          titulo: novoSonho.titulo,
          descricao: novoSonho.descricao,
          emocoesSonho: novoSonho.emocoesSonho,
          simbolos: novoSonho.simbolos,
          clareza: novoSonho.clareza,
        }
      );

      toast("Sucesso!", { description: "Sonho registrado!" });

      setNovoSonho({
        data: new Date().toISOString().split("T")[0],
        titulo: "",
        descricao: "",
        emocoesSonho: "",
        simbolos: "",
        clareza: "",
        categoria: "",
      });
    } catch (err) {
      toast("Erro ao registrar", {
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const removerSonho = async (id) => {
    await deleteJournal(id);
    toast("Sonho removido", {
      description: "Registro de sonho removido.",
    });
  };

  return (
    <TabsContent value="sonhos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de Registro */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20 dream-pattern">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                Registrar Sonho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSonhoSubmit} className="space-y-4">
                <InputField id="data-sonho" label="Data" type="date" value={novoSonho.data}
                  onChange={(e) => setNovoSonho({ ...novoSonho, data: e.target.value })} />
                <InputField id="titulo-sonho" label="Título *" value={novoSonho.titulo}
                  placeholder="Título do sonho"
                  onChange={(e) => setNovoSonho({ ...novoSonho, titulo: e.target.value })} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Categoria"
                    value={novoSonho.categoria}
                    onChange={(v) => setNovoSonho({ ...novoSonho, categoria: v })}
                    options={categoriasSonho.map((c) => ({ value: c, label: `${getCategoriaIcon(c)} ${c}` }))}
                  />
                  <SelectField
                    label="Clareza"
                    value={novoSonho.clareza}
                    onChange={(v) => setNovoSonho({ ...novoSonho, clareza: v })}
                    options={nivelClareza.map((c) => ({ value: c, label: c }))}
                  />
                </div>
                <TextareaField
                  label="Descrição *"
                  value={novoSonho.descricao}
                  onChange={(e) => setNovoSonho({ ...novoSonho, descricao: e.target.value })}
                />
                <InputField
                  id="emocoes-sonho"
                  label="Emoções no Sonho"
                  value={novoSonho.emocoesSonho}
                  placeholder="Como se sentiu?"
                  onChange={(e) => setNovoSonho({ ...novoSonho, emocoesSonho: e.target.value })}
                />
                <InputField
                  id="simbolos-sonho"
                  label="Símbolos"
                  value={novoSonho.simbolos}
                  placeholder="Elementos importantes"
                  onChange={(e) => setNovoSonho({ ...novoSonho, simbolos: e.target.value })}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Registrar Sonho
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Sonhos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Moon className="h-5 w-5" />
                Seus Sonhos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {(!sonhos || sonhos.length === 0) ? (
                  <div className="text-center py-8">
                    <Cloud className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70">Nenhum sonho registrado.</p>
                  </div>
                ) : (
                  sonhos
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map((s) => (
                      <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 rounded-lg p-4 space-y-3 dream-pattern">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{getCategoriaIcon(s.categoria)}</span>
                              <h3 className="text-white font-semibold">{s.titulo}</h3>
                              {s.clareza && (
                                <span className={`text-xs px-2 py-1 rounded-full bg-white/20 ${getClarezaColor(s.clareza)}`}>
                                  {s.clareza}
                                </span>
                              )}
                            </div>
                            <p className="text-white/80 text-sm mb-3 line-clamp-3">{s.descricao}</p>
                            {s.emocoesSonho && <Info label="Emoções" value={s.emocoesSonho} />}
                            {s.simbolos && <Info label="Símbolos" value={s.simbolos} />}
                            <div className="flex items-center justify-between">
                              <p className="text-white/50 text-xs">{formatarData(s.data)}</p>
                              {s.categoria && <span className="text-white/60 text-xs">{s.categoria}</span>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removerSonho(s.id)}
                            className="text-red-300 hover:text-red-200 hover:bg-red-500/20 ml-2"
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

      {/* Análise dos Sonhos */}
      {sonhos && sonhos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Star className="h-5 w-5" />
                Análise dos Sonhos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-white">
                <Metric label="Total de sonhos" value={sonhos.length} />
                <Metric
                  label="Categoria mais comum"
                  value={
                    Object.entries(sonhos.reduce((acc, s) => {
                      acc[s.categoria] = (acc[s.categoria] || 0) + 1;
                      return acc;
                    }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
                  }
                />
                <Metric
                  label="Sonhos lúcidos"
                  value={sonhos.filter((s) => s.categoria === "Sonho Lúcido").length}
                />
                <Metric
                  label="Sonhos claros"
                  value={sonhos.filter((s) => ["Muito Claro", "Claro"].includes(s.clareza)).length}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </TabsContent>
  );
}

// Componentes auxiliares
function InputField({ id, label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <Label htmlFor={id} className="text-white">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Textarea
        value={value}
        onChange={onChange}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <Label className="text-white">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-2">
      <span className="text-white/60 text-xs font-medium">{label}: </span>
      <span className="text-white/80 text-xs">{value}</span>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}
