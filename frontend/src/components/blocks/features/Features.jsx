import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    category: "Agendamentos",
    title: "Controle total sobre suas sessões",
    details:
      "Gerencie horários de atendimento de forma simples e eficiente. Permita que pacientes agendem sessões de acordo com sua disponibilidade.",
    tutorialLink: "#",
  },
  {
    category: "Diários Emocionais",
    title: "Acompanhe emoções em tempo real",
    details:
      "Os pacientes registram sentimentos e estados emocionais que ajudam na construção de um histórico terapêutico mais rico e personalizado.",
    tutorialLink: "#",
  },
  {
    category: "Diário de Sonhos",
    title: "Compreenda os padrões subconscientes",
    details:
      "Registre e acompanhe sonhos dos pacientes para enriquecer o processo terapêutico com mais profundidade.",
    tutorialLink: "#",
  },
  {
    category: "Gestão de Pacientes",
    title: "Centralize informações clínicas",
    details:
      "Armazene dados importantes, histórico de sessões e registros dos pacientes em um ambiente seguro e organizado.",
    tutorialLink: "#",
  },
  {
    category: "Experiência do Paciente",
    title: "Uma jornada acolhedora e acessível",
    details:
      "Interface intuitiva e segura para pacientes acessarem seus registros, sessões e evoluções terapêuticas.",
    tutorialLink: "#",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full py-10 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          Boost Your Strategy with Smart Features
        </h2>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
            >
              <div className="w-full aspect-[6/4] bg-muted rounded-xl border border-border/50 basis-1/2" />
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-semibold text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-[17px]">
                  {feature.details}
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full min-w-40 text-[15px]"
                >
                  <Link href={feature.tutorialLink}>
                    Aprender mais <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
