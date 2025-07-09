// app/admin/patient/page.jsx
import PatientAdminClient from "@/components/blocks/admin/patients/PatientAdminClient";
import { apiServer } from "@/lib/api-server";

export default async function patientAdminPage() {
  const patient = await apiServer.get("patient");
  console.log(patient);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Painel de Pacientes</h1>
        <p className="text-muted-foreground">
          Gerencie os pacientes cadastrados na plataforma
        </p>
      </div>
      <PatientAdminClient initialData={patient} />
    </>
  );
}
