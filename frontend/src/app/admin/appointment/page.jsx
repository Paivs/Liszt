// app/admin/appointment/page.jsx
import AppointmentAdminClient from "@/components/blocks/admin/appointment/AppointmentAdminClient";
import { apiServer } from "@/lib/api-server";

export default async function AppointmentAdminPage({ searchParams }) {
  const page = Number(searchParams.page || 1);
  const { data, meta } = await apiServer.get(`appointment/paginate?page=${page}&limit=10`);
  

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sessões</h1>
        <p className="text-muted-foreground">
          Gerencie os agendamentos de sessões.
        </p>
      </div>

      <AppointmentAdminClient initialData={data} meta={meta} />
    </div>
  );
}
