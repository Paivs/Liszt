"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell, Lock, Palette, Save } from "lucide-react";

const SettingsSection = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/70 p-6 rounded-lg shadow-xl border border-slate-700 mb-8"
  >
    <div className="flex items-center mb-6">
      {icon}
      <h2 className="ml-3 text-2xl font-semibold text-purple-400">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SettingsPage = () => {
  return (
    <section className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8 max-w-3xl container mx-auto p-2"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Configurações
        </h1>

        <SettingsSection
          title="Perfil"
          icon={<UserCircle className="w-7 h-7 text-purple-400" />}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                defaultValue="Advogado Exemplo"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue="advogado@example.com"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Save size={18} className="mr-2" /> Salvar Alterações do Perfil
            </Button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notificações"
          icon={<Bell className="w-7 h-7 text-purple-400" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Notificações por Email</span>
              {/* Placeholder for a Switch component */}
              <div className="w-12 h-6 bg-slate-700 rounded-full p-1 flex items-center cursor-pointer">
                <div className="w-4 h-4 bg-purple-400 rounded-full transform transition-transform"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Notificações no Aplicativo</span>
              <div className="w-12 h-6 bg-slate-700 rounded-full p-1 flex items-center cursor-pointer">
                <div className="w-4 h-4 bg-purple-400 rounded-full transform transition-transform translate-x-6"></div>
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Segurança"
          icon={<Lock className="w-7 h-7 text-purple-400" />}
        >
          <div className="space-y-4">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            >
              Alterar Senha
            </Button>
            <p className="text-sm text-slate-400">
              Autenticação de dois fatores (2FA) está{" "}
              <span className="text-purple-400 font-semibold">Ativada</span>.
            </p>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Aparência"
          icon={<Palette className="w-7 h-7 text-purple-400" />}
        >
          <p className="text-slate-300 mb-3">Tema da Interface:</p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 bg-purple-500/20"
            >
              Escuro (Atual)
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-400 hover:bg-slate-700"
            >
              Claro
            </Button>
          </div>
        </SettingsSection>
      </motion.div>
    </section>
  );
};

export default SettingsPage;
