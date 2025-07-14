"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { api } from "@/lib/api";

export default function AppointmentTherapistSettings() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("08:00:00");
  const [endTime, setEndTime] = useState("18:00:00");
  const [acceptRemote, setAcceptRemote] = useState(false);
  const [acceptPresential, setAcceptPresential] = useState(true);

  const handleDayToggle = (day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((item) => item !== day)
        : [...prevSelected, day]
    );
  };

  const settingsSchema = z.object({
    days: z
      .array(z.string())
      .min(1, "Selecione pelo menos um dia de atendimento"),
    startTime: z.string().min(1, "Selecione um horário de início"),
    endTime: z.string().min(1, "Selecione um horário de término"),
    type: z.string().min(1, "Selecione o tipo de atendimento"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      days: [],
      startTime: "08:00:00",
      endTime: "18:00:00",
      type: "presencial",
    },
  });

  // Sincroniza os dias selecionados com o react-hook-form
  useEffect(() => {
    setValue("days", selectedDays);
  }, [selectedDays, setValue]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("appointment/settings");

        const {
          available_days,
          start_time,
          end_time,
          accepts_remote,
          accepts_presential,
        } = response;

        setSelectedDays(available_days || []);
        setStartTime(start_time || "08:00:00");
        setEndTime(end_time || "18:00:00");
        setAcceptRemote(accepts_remote);
        setAcceptPresential(accepts_presential);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };

    fetchSettings();
  }, []);

  const onSubmit = async (data) => {
    const settings = {
      available_days: data.days,
      start_time: data.startTime,
      end_time: data.endTime,
      accepts_remote: acceptRemote,
      accepts_presential: acceptPresential,
    };

    try {
      const response = await api.put("appointment/settings", settings);
      console.log("Configurações salvas:", response);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <Settings2 size={20} />
          <span className="text-sm">Configurações</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full flex flex-col items-center justify-center mt-4">
          <DrawerTitle className="text-xl text-foreground">
            Configurações de Sessão
          </DrawerTitle>
          <DrawerDescription className="text-md text-muted-foreground">
            Edite suas preferências de agendamento.
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-w-md mx-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="days" className="font-medium text-lg">
                  Dias de Atendimento
                </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {[
                    { label: "DOM", fullName: "Domingo" },
                    { label: "SEG", fullName: "Segunda" },
                    { label: "TER", fullName: "Terça" },
                    { label: "QUA", fullName: "Quarta" },
                    { label: "QUI", fullName: "Quinta" },
                    { label: "SEX", fullName: "Sexta" },
                    { label: "SAB", fullName: "Sábado" },
                  ].map((day, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-center items-center"
                    >
                      <Label htmlFor={day.label}>{day.label}</Label>
                      <Checkbox
                        id={day.label}
                        checked={selectedDays.includes(day.fullName)}
                        onCheckedChange={() => handleDayToggle(day.fullName)}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
                {errors.days && (
                  <span className="text-red-500 text-sm">
                    {errors.days.message}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="time-range" className="font-medium text-lg">
                  Horários de Atendimento
                </Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <Label htmlFor="start-time">Início</Label>
                    <Select
                      value={startTime}
                      onValueChange={setStartTime}
                    >
                      <SelectTrigger id="start-time">
                        <SelectValue placeholder="Horário de início" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "08:00:00",
                          "09:00:00",
                          "10:00:00",
                          "11:00:00",
                          "12:00:00",
                          "13:00:00",
                          "14:00:00",
                          "15:00:00",
                          "16:00:00",
                          "17:00:00",
                          "18:00:00",
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.slice(0, 5)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.startTime && (
                      <span className="text-red-500 text-sm">
                        {errors.startTime.message}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="end-time">Final</Label>
                    <Select
                      value={endTime}
                      onValueChange={setEndTime}
                    >
                      <SelectTrigger id="end-time">
                        <SelectValue placeholder="Horário de término" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "08:00:00",
                          "09:00:00",
                          "10:00:00",
                          "11:00:00",
                          "12:00:00",
                          "13:00:00",
                          "14:00:00",
                          "15:00:00",
                          "16:00:00",
                          "17:00:00",
                          "18:00:00",
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.slice(0, 5)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.endTime && (
                      <span className="text-red-500 text-sm">
                        {errors.endTime.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="type" className="font-medium text-lg">
                  Tipo de Atendimento
                </Label>
                <Select
                  value={
                    acceptRemote && acceptPresential
                      ? "ambos"
                      : acceptRemote
                      ? "remoto"
                      : "presencial"
                  }
                  onValueChange={(value) => {
                    if (value === "presencial") {
                      setAcceptPresential(true);
                      setAcceptRemote(false);
                    } else if (value === "remoto") {
                      setAcceptPresential(false);
                      setAcceptRemote(true);
                    } else {
                      setAcceptPresential(true);
                      setAcceptRemote(true);
                    }
                  }}
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Selecione o tipo de atendimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="remoto">Remoto</SelectItem>
                      <SelectItem value="ambos">Ambos</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <span className="text-red-500 text-sm">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <Button className="bg-primary text-white w-full" type="submit">
                Salvar Configurações
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
