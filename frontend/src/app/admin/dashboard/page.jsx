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

      </div>
    </div>
  );
};

export default Dashboard;
