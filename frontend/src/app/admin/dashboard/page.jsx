"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart, Moon, TrendingUp, Clock, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    proximaConsulta: null,
    totalEmocoes: 0,
    totalSonhos: 0,
    sessoesMes: 0
  });

  useEffect(() => {
    // Carregar dados do localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    const emocoes = JSON.parse(localStorage.getItem('emocoes') || '[]');
    const sonhos = JSON.parse(localStorage.getItem('sonhos') || '[]');

    // Encontrar próxima consulta
    const hoje = new Date();
    const proximasConsultas = agendamentos
      .filter(ag => new Date(ag.data) >= hoje)
      .sort((a, b) => new Date(a.data) - new Date(b.data));

    setStats({
      proximaConsulta: proximasConsultas[0] || null,
      totalEmocoes: emocoes.length,
      totalSonhos: sonhos.length,
      sessoesMes: agendamentos.filter(ag => {
        const dataConsulta = new Date(ag.data);
        return dataConsulta.getMonth() === hoje.getMonth() && 
               dataConsulta.getFullYear() === hoje.getFullYear();
      }).length
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
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
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo ao Liszt
          </h1>
          <p className="text-white/80 text-lg">
            Sua jornada de bem-estar mental começa aqui
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Próxima Consulta
                </CardTitle>
                <Calendar className="h-4 w-4 text-purple-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.proximaConsulta ? 
                    new Date(stats.proximaConsulta.data).toLocaleDateString('pt-BR') : 
                    'Nenhuma'
                  }
                </div>
                <p className="text-xs text-white/70">
                  {stats.proximaConsulta ? 
                    `${stats.proximaConsulta.horario} - ${stats.proximaConsulta.terapeuta}` : 
                    'Agende sua próxima sessão'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Registros de Emoções
                </CardTitle>
                <Heart className="h-4 w-4 text-red-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalEmocoes}
                </div>
                <p className="text-xs text-white/70">
                  Total de registros
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Diário de Sonhos
                </CardTitle>
                <Moon className="h-4 w-4 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalSonhos}
                </div>
                <p className="text-xs text-white/70">
                  Sonhos registrados
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Sessões este Mês
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.sessoesMes}
                </div>
                <p className="text-xs text-white/70">
                  Progresso mensal
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
                    <Heart className="h-4 w-4 text-red-300" />
                    <div>
                      <p className="text-white text-sm">Registro de emoção</p>
                      <p className="text-white/60 text-xs">Há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
                    <Moon className="h-4 w-4 text-blue-300" />
                    <div>
                      <p className="text-white text-sm">Novo sonho registrado</p>
                      <p className="text-white/60 text-xs">Ontem</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
                    <Calendar className="h-4 w-4 text-purple-300" />
                    <div>
                      <p className="text-white text-sm">Consulta agendada</p>
                      <p className="text-white/60 text-xs">Há 3 dias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Seus Terapeutas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">DS</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Dra. Sofia Mendes</p>
                      <p className="text-white/60 text-sm">Psicóloga Clínica</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">RC</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Dr. Rafael Costa</p>
                      <p className="text-white/60 text-sm">Psicoterapeuta</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">
                "A jornada de mil milhas começa com um único passo"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center">
                Continue registrando suas emoções e sonhos. Cada entrada é um passo importante 
                em direção ao seu bem-estar mental e autoconhecimento.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
