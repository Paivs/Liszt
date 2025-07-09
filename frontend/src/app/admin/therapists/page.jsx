// app/admin/therapists/page.jsx
import TherapistAdminClient from "@/components/blocks/admin/therapists/TherapistAdminClient";
import { apiServer } from "@/lib/api-server";

export default async function TherapistAdminPage() {
  const therapists = await apiServer.get("therapists");
  console.log(therapists);

  return (
    <>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Painel de Terapeutas</h1>
          <p className="text-muted-foreground">
            Gerencie os profissionais cadastrados na plataforma
          </p>
        </div>
      <TherapistAdminClient initialData={therapists} />;
    </>
  );
}
