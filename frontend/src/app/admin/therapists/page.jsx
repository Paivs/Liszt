// app/admin/therapist/page.jsx
import TherapistAdminClient from "@/components/blocks/admin/therapists/TherapistAdminClient";
import { apiServer } from "@/lib/api-server";

export default async function TherapistAdminPage({ searchParams }) {
  const params = await searchParams
  const page = params.page || 1;
  const filter = params.filter || "";
  const limit = 10;
  const search = params.search || "";

  const  { data, meta }  = await apiServer.get(`therapists/paginate?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Painel de Terapeutas</h1>
        <p className="text-muted-foreground">Gerencie os terapeutas cadastrados na plataforma</p>
      </div>
      <TherapistAdminClient initialData={data} meta={meta} />
    </>
  );
}
