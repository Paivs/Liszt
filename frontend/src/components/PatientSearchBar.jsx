"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PatientSearchBar({ onFilter }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setFilter(searchParams.get("filter") || "all");
  }, [searchParams]);

  const handleFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (filter && filter !== "all") params.set("filter", filter);

    params.set("page", "1");

    router.push(`/admin/patients?${params.toString()}`);
    onFilter({ search, filter });
  };

  return (
    <form onSubmit={handleFilter} className="flex flex-col md:flex-row md:items-end gap-4 my-4 w-full">
      <div className="flex flex-col space-y-1 w-full ">
        <Label htmlFor="search" className="text-muted-foreground">
          Buscar
        </Label>
        <Input
          id="search"
          placeholder="Nome ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full min-w-md"
        />
      </div>

      <div className="flex flex-col space-y-1 w-full md:max-w-xs">
        <Label htmlFor="status" className="text-muted-foreground">
          Status
        </Label>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:ml-auto">
        <Button type="submit" onClick={handleFilter} className="bg-primary text-white">
          Filtrar
        </Button>
      </div>
    </form>
  );
}
