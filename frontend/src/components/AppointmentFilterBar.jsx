"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AppointmentFilterBar({ onFilter }) {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  useEffect(() => {
    setStartDate(searchParams.get("startDate") || "");
    setEndDate(searchParams.get("endDate") || "");
  }, [searchParams]);

  const handleFilter = () => {
     if (!startDate || !endDate) {
      toast.warning("Preencha ambos os campos")
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (startDate) params.set("startDate", startDate);
    else params.delete("startDate");

    if (endDate) params.set("endDate", endDate);
    else params.delete("endDate");

    params.set("page", "1"); // reinicia paginação

    router.push(`/admin/appointment?${params.toString()}`);
    onFilter({ startDate, endDate });
  };

  return (
    <div className="flex flex-col md:flex-row items-end gap-4 my-4 w-full">
      <div className="flex flex-col space-y-1 w-full md:max-w-xs">
        <Label htmlFor="startDate" className="text-muted-foreground">
          Data inicial
        </Label>
        <Input
          id="startDate"
          type="date"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-1 w-full md:max-w-xs">
        <Label htmlFor="endDate" className="text-muted-foreground">
          Data final
        </Label>
        <Input
          id="endDate"
          type="date"
          required
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="md:ml-auto">
        <Button onClick={handleFilter} className="bg-primary text-white">
          Filtrar
        </Button>
      </div>
    </div>
  );
}
