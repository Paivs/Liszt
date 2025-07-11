// /admin/patient/page.jsx
import PatientAdminClient from "@/components/blocks/admin/patients/PatientAdminClient";
import { apiServer } from "@/lib/api-server";

export default async function patientAdminPage({ searchParams }) {
  const params = await searchParams
  const page = params.page || 1;
  const filter = params.filter || "";
  const limit = 10;
  const search = params.search || "";

  const  { data, meta }  = await apiServer.get(`patient/paginate?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Painel de Pacientes</h1>
        <p className="text-muted-foreground">
          Gerencie os pacientes cadastrados na plataforma
        </p>
      </div>
      <PatientAdminClient initialData={data} meta={meta} />
    </>
  );
}
