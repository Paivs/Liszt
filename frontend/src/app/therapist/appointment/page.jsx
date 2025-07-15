// app/therapist/appointment/page.jsx
import AppointmentTherapistClient from "@/components/blocks/therapist/appointment/AppointmentTherapistClient";
import AppointmentTherapistSettings from "@/components/blocks/therapist/appointment/AppointmentTherapistSettings";
import { apiServer } from "@/lib/api-server";

export default async function TherapistAdminPage({ searchParams }) {
  const params = await searchParams
  const page = params.page || 1;
  const filter = params.filter || "";
  const limit = 10;
  const search = params.search || "";

  const  { data, meta }  = await apiServer.get(`appointment/paginate-therapist?page=${page}&limit=${limit}&search=${search}&filter=${filter}&view=semana`);

  return (
    <>
    <div className="w-full flex justify-between items-center p-4">

      <div className="">
        <h1 className="text-2xl font-bold">Gerenciamento de Sessões</h1>
        <p className="text-muted-foreground">Administre, crie e edite seus agendamentos</p>
      </div>

      <AppointmentTherapistSettings/>
    </div>
      <AppointmentTherapistClient initialData={data} meta={meta} />
    </>
  );
}
