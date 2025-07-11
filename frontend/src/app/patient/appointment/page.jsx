import AppointmentClientWrapper from "@/components/blocks/appointment/AppointmentClientWrapper";
import { apiServer } from "@/lib/api-server";
import { UnauthorizedError } from "@/lib/errors";
import { redirect } from "next/navigation";

export default async function Agendamento() {
  let terapeutas = [];
  let agendamentos = [];


    const [terapeutasRes, agendamentosRes] = await Promise.all([
      apiServer.get("user/therapist"),
      apiServer.get("appointment"),
    ]);

    terapeutas = terapeutasRes || [];
    console.log(terapeutasRes)
    agendamentos = agendamentosRes || [];


  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold text-white mb-2">
            Agendamento de Consultas
          </h1>
          <p className="text-white/80 text-lg">
            Gerencie suas sessões de psicoterapia
          </p>
        </div>
        <AppointmentClientWrapper
          terapeutas={terapeutas}
          agendamentos={agendamentos}
        />
      </div>
    </div>
  );
}
