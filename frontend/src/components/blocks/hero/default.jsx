import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero01 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <Badge>Versão 1.0.0 disponível</Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Plataforma para Psicoterapeutas e Pacientes
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          O <strong>Liszt</strong> conecta psicoterapeutas e pacientes em um
          ambiente seguro e intuitivo. Gerencie sessões, acompanhe diários de
          emoções e sonhos, e otimize o agendamento de consultas com facilidade.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href={"/login"}>
            <Button size="lg" className="rounded-full text-base">
              Começar Agora <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Ver Demonstração
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero01;
