"use client";

import { useAppointments } from "@/hooks/useAdminAppointments";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import AppointmentFilterBar from "@/components/AppointmentFilterBar";

export default function AppointmentAdminClient({ initialData, meta }) {
  const { appointments, updateStatus, fetchAppointments, deleteAppointment } =
    useAppointments(initialData);

  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <CardHeader>
            <h2 className="text-xl font-bold">Gerenciar Sessões</h2>
            <AppointmentFilterBar
              onFilter={({ startDate, endDate }) =>
                fetchAppointments({ startDate, endDate, page: 1 })
              }
            />
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Terapeuta</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a?.patient?.name || "-"}</TableCell>
                  <TableCell>{a?.therapist?.name || "-"}</TableCell>
                  <TableCell>
                    {new Date(a.scheduled_time).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{a.status_appointment}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Remover Sessão?</DialogTitle>
                        <p>
                          Deseja remover a sessão agendada com {a.Patient?.name}
                          ?
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="ghost">Cancelar</Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteAppointment(a.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={meta.currentPage}
        totalPages={meta.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
