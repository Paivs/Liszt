"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Moon,
  Plus,
  Trash2,
  TrendingUp,
  Star,
  Cloud,
  BookHeart,
} from "lucide-react";
import { toast } from "sonner";

const DiarioUnificado = () => {
  const [activeTab, setActiveTab] = useState("emocoes");

  const [emocoes, setEmocoes] = useState([]);
  const [novaEmocao, setNovaEmocao] = useState({
    data: new Date().toISOString().split("T")[0],
    emocao: "",
    intensidade: [5],
    descricao: "",
    gatilho: "",
  });

  const [sonhos, setSonhos] = useState([]);
  const [novoSonho, setNovoSonho] = useState({
    data: new Date().toISOString().split("T")[0],
    titulo: "",
    descricao: "",
    emocoesSonho: "",
    simbolos: "",
    clareza: "",
    categoria: "",
  });

  const emocoesComuns = [
    { nome: "Alegria", cor: "from-yellow-400 to-orange-400", emoji: "😊" },
    { nome: "Tristeza", cor: "from-blue-400 to-blue-600", emoji: "😢" },
    { nome: "Raiva", cor: "from-red-400 to-red-600", emoji: "😠" },
    { nome: "Ansiedade", cor: "from-purple-400 to-purple-600", emoji: "😰" },
    { nome: "Medo", cor: "from-gray-400 to-gray-600", emoji: "😨" },
    { nome: "Amor", cor: "from-pink-400 to-red-400", emoji: "❤️" },
    { nome: "Esperança", cor: "from-green-400 to-green-600", emoji: "🌟" },
    { nome: "Frustração", cor: "from-orange-400 to-red-400", emoji: "😤" },
  ];

  const categoriasSonho = [
    "Pesadelo",
    "Sonho Lúcido",
    "Sonho Recorrente",
    "Sonho Profético",
    "Sonho Comum",
    "Sonho Simbólico",
  ];
  const nivelClareza = [
    "Muito Vago",
    "Vago",
    "Moderado",
    "Claro",
    "Muito Claro",
  ];

  useEffect(() => {
    const emocoesSalvas = localStorage.getItem("emocoes");
    if (emocoesSalvas) setEmocoes(JSON.parse(emocoesSalvas));
    const sonhosSalvos = localStorage.getItem("sonhos");
    if (sonhosSalvos) setSonhos(JSON.parse(sonhosSalvos));
  }, []);

  const salvarEmocoes = (novasEmocoes) => {
    localStorage.setItem("emocoes", JSON.stringify(novasEmocoes));
    setEmocoes(novasEmocoes);
  };

  const salvarSonhos = (novosSonhos) => {
    localStorage.setItem("sonhos", JSON.stringify(novosSonhos));
    setSonhos(novosSonhos);
  };

  const handleEmocaoSubmit = (e) => {
    e.preventDefault();
    if (!novaEmocao.emocao || !novaEmocao.descricao) {
      toast(
        "Erro", {
        description: "Preencha emoção e descrição.",
        variant: "destructive",
      });
      return;
    }
    const emocao = {
      id: Date.now(),
      ...novaEmocao,
      intensidade: novaEmocao.intensidade[0],
      timestamp: new Date().toISOString(),
    };
    salvarEmocoes([...emocoes, emocao]);
    toast("Sucesso!", {description: "Emoção registrada!" });
    setNovaEmocao({
      data: new Date().toISOString().split("T")[0],
      emocao: "",
      intensidade: [5],
      descricao: "",
      gatilho: "",
    });
  };

  const handleSonhoSubmit = (e) => {
    e.preventDefault();
    if (!novoSonho.titulo || !novoSonho.descricao) {
      toast("Erro", {
        description: "Preencha título e descrição do sonho.",
        variant: "destructive",
      });
      return;
    }
    const sonho = {
      id: Date.now(),
      ...novoSonho,
      timestamp: new Date().toISOString(),
    };
    salvarSonhos([...sonhos, sonho]);
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
  };

  const removerEmocao = (id) => {
    salvarEmocoes(emocoes.filter((em) => em.id !== id));
    toast("Registro removido", { description: "Emoção removida." });
  };

  const removerSonho = (id) => {
    salvarSonhos(sonhos.filter((s) => s.id !== id));
    toast("Sonho removido", {
      description: "Registro de sonho removido.",
    });
  };

  const formatarData = (data) => new Date(data).toLocaleDateString("pt-BR");
  const getEmocaoInfo = (nomeEmocao) =>
    emocoesComuns.find((e) => e.nome === nomeEmocao) || {
      cor: "from-gray-400 to-gray-600",
      emoji: "😐",
    };
  const getIntensidadeColor = (intensidade) => {
    if (intensidade <= 3) return "text-green-400";
    if (intensidade <= 6) return "text-yellow-400";
    if (intensidade <= 8) return "text-orange-400";
    return "text-red-400";
  };
  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case "Pesadelo":
        return "😱";
      case "Sonho Lúcido":
        return "🌟";
      case "Sonho Recorrente":
        return "🔄";
      case "Sonho Profético":
        return "🔮";
      case "Sonho Simbólico":
        return "🎭";
      default:
        return "💭";
    }
  };
  const getClarezaColor = (clareza) => {
    switch (clareza) {
      case "Muito Vago":
        return "text-gray-400";
      case "Vago":
        return "text-blue-400";
      case "Moderado":
        return "text-yellow-400";
      case "Claro":
        return "text-orange-400";
      case "Muito Claro":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BookHeart className="mr-3 h-10 w-10" /> Diários
          </h1>
          <p className="text-white/80 text-lg">
            Registre suas emoções e sonhos em um só lugar.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 glass-effect border-white/20 p-1">
            <TabsTrigger
              value="emocoes"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Heart className="mr-2 h-5 w-5" /> Diário de Emoções
            </TabsTrigger>
            <TabsTrigger
              value="sonhos"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Moon className="mr-2 h-5 w-5" /> Diário de Sonhos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emocoes">
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
                      Registrar Emoção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmocaoSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="data-emocao" className="text-white">
                          Data
                        </Label>
                        <Input
                          id="data-emocao"
                          type="date"
                          value={novaEmocao.data}
                          onChange={(e) =>
                            setNovaEmocao({
                              ...novaEmocao,
                              data: e.target.value,
                            })
                          }
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-3 block">
                          Selecione sua emoção
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {emocoesComuns.map((em) => (
                            <motion.button
                              key={em.nome}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setNovaEmocao({
                                  ...novaEmocao,
                                  emocao: em.nome,
                                })
                              }
                              className={`p-3 rounded-lg bg-gradient-to-r ${
                                em.cor
                              } text-white font-medium transition-all ${
                                novaEmocao.emocao === em.nome
                                  ? "ring-2 ring-white"
                                  : ""
                              }`}
                            >
                              <span className="text-lg mr-2">{em.emoji}</span>
                              {em.nome}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">
                          Intensidade: {novaEmocao.intensidade[0]}/10
                        </Label>
                        <Slider
                          value={novaEmocao.intensidade}
                          onValueChange={(v) =>
                            setNovaEmocao({ ...novaEmocao, intensidade: v })
                          }
                          max={10}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-white/60 mt-1">
                          <span>Baixa</span>
                          <span>Moderada</span>
                          <span>Alta</span>
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="descricao-emocao"
                          className="text-white"
                        >
                          Descrição *
                        </Label>
                        <Textarea
                          id="descricao-emocao"
                          value={novaEmocao.descricao}
                          onChange={(e) =>
                            setNovaEmocao({
                              ...novaEmocao,
                              descricao: e.target.value,
                            })
                          }
                          placeholder="Como você está se sentindo?"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gatilho-emocao" className="text-white">
                          Gatilho/Situação
                        </Label>
                        <Input
                          id="gatilho-emocao"
                          value={novaEmocao.gatilho}
                          onChange={(e) =>
                            setNovaEmocao({
                              ...novaEmocao,
                              gatilho: e.target.value,
                            })
                          }
                          placeholder="O que desencadeou?"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full emotion-gradient text-white font-semibold"
                      >
                        Registrar Emoção
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
                      <Heart className="h-5 w-5" />
                      Histórico de Emoções
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {emocoes.length === 0 ? (
                        <div className="text-center py-8">
                          <Heart className="h-12 w-12 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70">
                            Nenhuma emoção registrada.
                          </p>
                        </div>
                      ) : (
                        emocoes
                          .sort(
                            (a, b) =>
                              new Date(b.timestamp) - new Date(a.timestamp)
                          )
                          .map((em) => {
                            const emInfo = getEmocaoInfo(em.emocao);
                            return (
                              <motion.div
                                key={em.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/10 rounded-lg p-4 space-y-2"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-lg">
                                        {emInfo.emoji}
                                      </span>
                                      <span className="text-white font-medium">
                                        {em.emocao}
                                      </span>
                                      <span
                                        className={`font-bold ${getIntensidadeColor(
                                          em.intensidade
                                        )}`}
                                      >
                                        {em.intensidade}/10
                                      </span>
                                    </div>
                                    <p className="text-white/80 text-sm mb-2">
                                      {em.descricao}
                                    </p>
                                    {em.gatilho && (
                                      <p className="text-white/60 text-xs mb-2">
                                        <strong>Gatilho:</strong> {em.gatilho}
                                      </p>
                                    )}
                                    <p className="text-white/50 text-xs">
                                      {formatarData(em.data)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removerEmocao(em.id)}
                                    className="text-red-300 hover:text-red-200 hover:bg-red-500/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            {emocoes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      Insights de Emoções
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {emocoes.length}
                        </p>
                        <p className="text-white/70 text-sm">
                          Total de registros
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {emocoes.length > 0
                            ? (
                                emocoes.reduce(
                                  (acc, em) => acc + em.intensidade,
                                  0
                                ) / emocoes.length
                              ).toFixed(1)
                            : 0}
                        </p>
                        <p className="text-white/70 text-sm">
                          Intensidade média
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {emocoes.length > 0
                            ? Object.entries(
                                emocoes.reduce((acc, em) => {
                                  acc[em.emocao] = (acc[em.emocao] || 0) + 1;
                                  return acc;
                                }, {})
                              ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
                            : "N/A"}
                        </p>
                        <p className="text-white/70 text-sm">
                          Emoção mais frequente
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="sonhos">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <div>
                        <Label htmlFor="data-sonho" className="text-white">
                          Data
                        </Label>
                        <Input
                          id="data-sonho"
                          type="date"
                          value={novoSonho.data}
                          onChange={(e) =>
                            setNovoSonho({ ...novoSonho, data: e.target.value })
                          }
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="titulo-sonho" className="text-white">
                          Título *
                        </Label>
                        <Input
                          id="titulo-sonho"
                          value={novoSonho.titulo}
                          onChange={(e) =>
                            setNovoSonho({
                              ...novoSonho,
                              titulo: e.target.value,
                            })
                          }
                          placeholder="Título do sonho"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="categoria-sonho"
                            className="text-white"
                          >
                            Categoria
                          </Label>
                          <Select
                            value={novoSonho.categoria}
                            onValueChange={(v) =>
                              setNovoSonho({ ...novoSonho, categoria: v })
                            }
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Tipo de sonho" />
                            </SelectTrigger>
                            <SelectContent>
                              {categoriasSonho.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {getCategoriaIcon(cat)} {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="clareza-sonho" className="text-white">
                            Clareza
                          </Label>
                          <Select
                            value={novoSonho.clareza}
                            onValueChange={(v) =>
                              setNovoSonho({ ...novoSonho, clareza: v })
                            }
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Quão claro foi?" />
                            </SelectTrigger>
                            <SelectContent>
                              {nivelClareza.map((niv) => (
                                <SelectItem key={niv} value={niv}>
                                  {niv}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="descricao-sonho" className="text-white">
                          Descrição *
                        </Label>
                        <Textarea
                          id="descricao-sonho"
                          value={novoSonho.descricao}
                          onChange={(e) =>
                            setNovoSonho({
                              ...novoSonho,
                              descricao: e.target.value,
                            })
                          }
                          placeholder="Descreva seu sonho"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emocoes-sonho" className="text-white">
                          Emoções no Sonho
                        </Label>
                        <Input
                          id="emocoes-sonho"
                          value={novoSonho.emocoesSonho}
                          onChange={(e) =>
                            setNovoSonho({
                              ...novoSonho,
                              emocoesSonho: e.target.value,
                            })
                          }
                          placeholder="Como se sentiu?"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="simbolos-sonho" className="text-white">
                          Símbolos
                        </Label>
                        <Input
                          id="simbolos-sonho"
                          value={novoSonho.simbolos}
                          onChange={(e) =>
                            setNovoSonho({
                              ...novoSonho,
                              simbolos: e.target.value,
                            })
                          }
                          placeholder="Elementos importantes"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
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
                      {sonhos.length === 0 ? (
                        <div className="text-center py-8">
                          <Cloud className="h-12 w-12 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70">
                            Nenhum sonho registrado.
                          </p>
                        </div>
                      ) : (
                        sonhos
                          .sort(
                            (a, b) =>
                              new Date(b.timestamp) - new Date(a.timestamp)
                          )
                          .map((s) => (
                            <motion.div
                              key={s.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white/10 rounded-lg p-4 space-y-3 dream-pattern"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-lg">
                                      {getCategoriaIcon(s.categoria)}
                                    </span>
                                    <h3 className="text-white font-semibold">
                                      {s.titulo}
                                    </h3>
                                    {s.clareza && (
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full bg-white/20 ${getClarezaColor(
                                          s.clareza
                                        )}`}
                                      >
                                        {s.clareza}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-white/80 text-sm mb-3 line-clamp-3">
                                    {s.descricao}
                                  </p>
                                  {s.emocoesSonho && (
                                    <div className="mb-2">
                                      <span className="text-white/60 text-xs font-medium">
                                        Emoções:{" "}
                                      </span>
                                      <span className="text-white/80 text-xs">
                                        {s.emocoesSonho}
                                      </span>
                                    </div>
                                  )}
                                  {s.simbolos && (
                                    <div className="mb-2">
                                      <span className="text-white/60 text-xs font-medium">
                                        Símbolos:{" "}
                                      </span>
                                      <span className="text-white/80 text-xs">
                                        {s.simbolos}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between">
                                    <p className="text-white/50 text-xs">
                                      {formatarData(s.data)}
                                    </p>
                                    {s.categoria && (
                                      <span className="text-white/60 text-xs">
                                        {s.categoria}
                                      </span>
                                    )}
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
            {sonhos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Star className="h-5 w-5" />
                      Análise dos Sonhos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {sonhos.length}
                        </p>
                        <p className="text-white/70 text-sm">Total de sonhos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {sonhos.length > 0
                            ? Object.entries(
                                sonhos.reduce((acc, s) => {
                                  acc[s.categoria] =
                                    (acc[s.categoria] || 0) + 1;
                                  return acc;
                                }, {})
                              ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
                            : "N/A"}
                        </p>
                        <p className="text-white/70 text-sm">
                          Categoria mais comum
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {
                            sonhos.filter((s) => s.categoria === "Sonho Lúcido")
                              .length
                          }
                        </p>
                        <p className="text-white/70 text-sm">Sonhos lúcidos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {
                            sonhos.filter(
                              (s) =>
                                s.clareza === "Muito Claro" ||
                                s.clareza === "Claro"
                            ).length
                          }
                        </p>
                        <p className="text-white/70 text-sm">Sonhos claros</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DiarioUnificado;