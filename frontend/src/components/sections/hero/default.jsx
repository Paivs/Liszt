"use client"

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Bem-vindo ao Liszt
          </h1>
          <p className="text-xl mb-6">
            A plataforma para gerenciar seu diário de emoções e sonhos, agendar sessões de terapia e muito mais.
          </p>
          <Button className="bg-white text-blue-500 hover:bg-gray-100">
            Comece Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
