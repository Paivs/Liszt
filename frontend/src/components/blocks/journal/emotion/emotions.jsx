import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import { Heart, Plus, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import usePatientJournal from "@/hooks/usePatientEmotionJournal";
import { z } from "zod";
import { emotionSchema } from "@/lib/schemas/emotionSchema";
import { useEmotionStore } from "@/stores/emotionStore";

export default function Emotions({ initialEmotions = [] }) {
  const {
    journal: emocoes,
    fetchJournals,
    createJournal,
    deleteJournal,
  } = usePatientJournal(initialEmotions);

  const { novaEmocao, setNovaEmocao, resetEmocao } = useEmotionStore();

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

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

  const getEmocaoInfo = (nomeEmocao) =>
    emocoesComuns.find((e) => e.nome === nomeEmocao) || {
      cor: "from-gray-400 to-gray-600",
      emoji: "😐",
    };

  const getIntensidadeColor = (intensity) => {
    if (intensity <= 3) return "text-green-400";
    if (intensity <= 6) return "text-yellow-400";
    if (intensity <= 8) return "text-orange-400";
    return "text-red-400";
  };

  const formatarData = (date) => new Date(date).toLocaleDateString("pt-BR");

  const handleEmocaoSubmit = async (e) => {
    e.preventDefault();

    try {
      emotionSchema.parse(novaEmocao);
    } catch (validationError) {
      const errors = validationError.errors.map((err) => `• ${err.message}`);
      toast.error("Erro de validação", {
        description: (
          <div className="whitespace-pre-line text-left">
            {errors.join("\n")}
          </div>
        ),
        duration: 6000,
      });
      return;
    }

    try {
      await createJournal(
        novaEmocao.date,
        novaEmocao.mood,
        novaEmocao.intensity[0],
        novaEmocao.description,
        novaEmocao.emotion_trigger
      );

      toast.success("Sucesso!", { description: "Emoção registrada!" });
      resetEmocao();
    } catch (err) {
      toast.error("Erro ao registrar", {
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const removerEmocao = async (id) => {
    await deleteJournal(id);
    toast("Registro removido", { description: "Registro de emoção removida." });
  };

  return (
    <TabsContent value="emocoes">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registro de Emoção */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Plus className="h-5 w-5 mr-2" />
                Registrar Emoção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmocaoSubmit} className="space-y-6">
                <InputData
                  novaEmocao={novaEmocao}
                  setNovaEmocao={setNovaEmocao}
                  emocoesComuns={emocoesComuns}
                />
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

        {/* Lista de Emoções */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Heart className="h-5 w-5 mr-2" />
                Histórico de Emoções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {emocoes.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70">Nenhuma emoção registrada.</p>
                  </div>
                ) : (
                  emocoes
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )
                    .slice(-4)
                    .map((em, idx) => {
                      const emInfo = getEmocaoInfo(em.mood);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/10 rounded-lg p-4 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-lg">{emInfo.emoji}</span>
                                <span className="text-white font-medium">
                                  {em.mood}
                                </span>
                                <span
                                  className={`font-bold ${getIntensidadeColor(
                                    em.intensity
                                  )}`}
                                >
                                  {em.intensity}/10
                                </span>
                              </div>
                              <p className="text-white/80 text-sm mb-2">
                                {em.description}
                              </p>
                              {em.emotion_trigger && (
                                <p className="text-white/60 text-xs mb-2">
                                  <strong>Gatilho:</strong> {em.emotion_trigger}
                                </p>
                              )}
                              <p className="text-white/50 text-xs">
                                {formatarData(em.date)}
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

      {/* Insights */}
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
                <TrendingUp className="h-5 w-5 mr-2" />
                Insights de Emoções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-white">
                <Insight label="Total de registros" value={emocoes.length} />
                <Insight
                  label="Intensidade média"
                  value={(
                    emocoes.reduce((acc, em) => acc + em.intensity, 0) /
                    emocoes.length
                  ).toFixed(1)}
                />
                <Insight
                  label="Emoção mais frequente"
                  value={
                    Object.entries(
                      emocoes.reduce((acc, em) => {
                        acc[em.mood] = (acc[em.mood] || 0) + 1;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </TabsContent>
  );
}

function InputData({ novaEmocao, setNovaEmocao, emocoesComuns }) {
  return (
    <>
      <div>
        <Label htmlFor="date-mood" className="text-white">
          Data
        </Label>
        <Input
          id="date-mood"
          type="date"
          value={novaEmocao.date}
          onChange={(e) =>
            setNovaEmocao({ ...novaEmocao, date: e.target.value })
          }
          className="bg-white/10 border-white/20 text-white"
        />
      </div>
      <div>
        <Label className="text-white mb-3 block">Selecione sua emoção</Label>
        <div className="grid grid-cols-2 gap-3">
          {emocoesComuns.map((em) => (
            <motion.button
              key={em.nome}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNovaEmocao({ ...novaEmocao, mood: em.nome })}
              className={`p-3 rounded-lg bg-gradient-to-r ${
                em.cor
              } text-white font-medium ${
                novaEmocao.mood === em.nome ? "ring-2 ring-white" : ""
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
          Intensidade: {novaEmocao.intensity[0]}/10
        </Label>
        <Slider
          value={novaEmocao.intensity}
          onValueChange={(v) => setNovaEmocao({ ...novaEmocao, intensity: v })}
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
        <Label htmlFor="description-mood" className="text-white">
          Descrição *
        </Label>
        <Textarea
          id="description-mood"
          value={novaEmocao.description}
          onChange={(e) =>
            setNovaEmocao({ ...novaEmocao, description: e.target.value })
          }
          placeholder="Como você está se sentindo?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <Label htmlFor="emotion_trigger-mood" className="text-white">
          Gatilho/Situação
        </Label>
        <Input
          id="emotion_trigger-mood"
          value={novaEmocao.emotion_trigger}
          onChange={(e) =>
            setNovaEmocao({ ...novaEmocao, emotion_trigger: e.target.value })
          }
          placeholder="O que desencadeou?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
    </>
  );
}

function Insight({ label, value }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}
