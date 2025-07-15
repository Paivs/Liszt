"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiCalendarLine, RiDeleteBinLine } from "@remixicon/react";
import { format, isBefore } from "date-fns";

import {
  DefaultEndHour,
  DefaultStartHour,
  EndHour,
  StartHour,
} from "@/components/event-calendar/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ptBR } from "date-fns/locale";
import { api } from "@/lib/api";
import { useDebounce } from "use-debounce";

export function EventDialog({ event, isOpen, onClose, onSave, onDelete }) {
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(`${DefaultStartHour}:00`);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("remoto");
  const [typeAppointment, setTypeAppointment] = useState("individual");
  const [color, setColor] = useState("sky");
  const [error, setError] = useState(null);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [patientSuggestions, setPatientSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [debouncedPatient] = useDebounce(patient, 750);
  const inputRef = useRef(null);

  const eventSchema = z.object({
    patient_id: z.string().uuid({ message: "Paciente inválido" }),
    obs: z.string().optional(),
    scheduled_time: z.string({ required_error: "Data obrigatória" }),
    location: z.enum(["presencial", "remoto"], {
      required_error: "Selecione a localização",
    }),
    type_appointment: z.enum(["individual", "casal", "familiar", "avaliacao"], {
      required_error: "Selecione o tipo de sessão",
    }),
    label: z.string().min(1, "Selecione uma etiqueta"),
  });

  useEffect(() => {
    if (event) {
      setPatient(event.patient.name);
      setSelectedPatient(event.patient);
      setDescription(event.obs || "");

      const start = new Date(event.scheduled_time);

      setStartDate(start);

      setStartTime(formatTimeForInput(start));
      setAllDay(event.allDay || false);
      setLocation(event.location || "");
      setColor(event.label || "sky");
      setError(null); // Reset error when opening dialog
    } else {
      resetForm();
    }
  }, [event]);

  const resetForm = () => {
    setPatient("");
    setSelectedPatient(null);
    setPatientSuggestions([]);
    setDescription("");
    setStartDate(new Date());
    setStartTime(`${DefaultStartHour}:00`);
    setAllDay(false);
    setLocation("remoto");
    setColor("sky");
    setError(null);
  };

  const formatTimeForInput = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = Math.floor(date.getMinutes() / 15) * 15;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  // Memoize time options so they're only calculated once
  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = StartHour; hour <= EndHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const value = `${formattedHour}:${formattedMinute}`;
        const date = new Date(2000, 0, 1, hour, minute);
        const label = format(date, "HH:mm", { locale: ptBR }); // ou "h:mm a" para formato 12h com am/pm
        options.push({ value, label });
      }
    }

    return options;
  }, [StartHour, EndHour]);

  const handleSave = () => {
    const [hours, minutes] = startTime.split(":").map(Number);

    const localStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      hours,
      minutes
    );

    const start = new Date(
      localStart.getTime() - localStart.getTimezoneOffset() * 60000
    );

    const formData = {
      patient_id: selectedPatient.id || "",
      obs: description,
      scheduled_time: start.toISOString(),
      type_appointment: typeAppointment,
      location: location,
      label: color,
    };
    const result = eventSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      setError(firstError || "Erro de validação.");
      return;
    }

    setError(null);

    onSave({
      id: event?.id || "",
      ...formData,
    });
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
    }
  };

  // Updated color options to match types.ts
  const colorOptions = [
    {
      value: "sky",
      label: "Sky",
      bgClass: "bg-sky-400 data-[state=checked]:bg-sky-400",
      borderClass: "border-sky-400 data-[state=checked]:border-sky-400",
    },
    {
      value: "amber",
      label: "Amber",
      bgClass: "bg-amber-400 data-[state=checked]:bg-amber-400",
      borderClass: "border-amber-400 data-[state=checked]:border-amber-400",
    },
    {
      value: "violet",
      label: "Violet",
      bgClass: "bg-violet-400 data-[state=checked]:bg-violet-400",
      borderClass: "border-violet-400 data-[state=checked]:border-violet-400",
    },
    {
      value: "rose",
      label: "Rose",
      bgClass: "bg-rose-400 data-[state=checked]:bg-rose-400",
      borderClass: "border-rose-400 data-[state=checked]:border-rose-400",
    },
    {
      value: "emerald",
      label: "Emerald",
      bgClass: "bg-emerald-400 data-[state=checked]:bg-emerald-400",
      borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400",
    },
    {
      value: "orange",
      label: "Orange",
      bgClass: "bg-orange-400 data-[state=checked]:bg-orange-400",
      borderClass: "border-orange-400 data-[state=checked]:border-orange-400",
    },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      if (!debouncedPatient || debouncedPatient.length < 2) {
        setPatientSuggestions([]);
        setOpenSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const data = await api.get(`patient/search?term=${debouncedPatient}`);
        setPatientSuggestions(data || []);
        setOpenSuggestions(true);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
        setPatientSuggestions([]);
        setOpenSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchPatients();
  }, [debouncedPatient]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {event?.id ? "Editar Sessão" : "Criar Sessão"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {event?.id
              ? "Editar os detalhes dessa sessão"
              : "Adicionar uma nova sessão"}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="*:not-first:mt-1.5">
            <Label htmlFor="patient">Paciente</Label>

            <div className="relative">
              <Input
                id="patient"
                ref={inputRef}
                autoComplete="off"
                placeholder="Digite o nome ou CPF do paciente"
                value={selectedPatient ? selectedPatient.name : patient}
                disabled={!!selectedPatient}
                onFocus={() => {
                  if (patientSuggestions.length > 0) setOpenSuggestions(true);
                }}
                onChange={async (e) => {
                  const value = e.target.value;
                  setPatient(value);

                  if (value.length >= 2) {
                    setLoadingSuggestions(true);
                    try {
                      const data = await api.get(
                        `patient/search?term=${value}`
                      );
                      setPatientSuggestions(data || []);
                      setOpenSuggestions(true);
                    } catch (err) {
                      console.error("Erro ao buscar pacientes:", err);
                      setPatientSuggestions([]);
                      setOpenSuggestions(false);
                    } finally {
                      setLoadingSuggestions(false);
                    }
                  } else {
                    setPatientSuggestions([]);
                    setOpenSuggestions(false);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setOpenSuggestions(false), 100);
                }}
              />

              {/* Sugestões de pacientes */}
              {!selectedPatient && openSuggestions && (
                <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow max-h-60 overflow-auto">
                  {loadingSuggestions ? (
                    <div className="p-4 text-sm text-muted-foreground">
                      Carregando...
                    </div>
                  ) : patientSuggestions.length > 0 ? (
                    <ul>
                      {patientSuggestions.map((patient, idx) => (
                        <li
                          key={idx}
                          className="py-2 text-sm hover:bg-accent hover:text-accent-foreground h-auto w-full"
                        >
                          <Button
                            variant={"ghost"}
                            onMouseDown={() => {
                              setSelectedPatient(patient);
                              setPatient("");
                              setPatientSuggestions([]);
                              // setOpenSuggestions(false);
                            }}
                            className={
                              "flex flex-col items-start justify-start h-auto w-full cursor-pointer"
                            }
                          >
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {patient.cpf}
                            </div>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground">
                      Nenhum paciente encontrado.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Badge com paciente selecionado */}
            {selectedPatient && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium">
                <div>
                  {selectedPatient.name} – {selectedPatient.cpf}
                </div>
                <button
                  type="button"
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedPatient(null)}
                >
                  <span className="sr-only">Remover paciente</span>×
                </button>
              </div>
            )}
          </div>

          <div className="*:not-first:mt-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              placeholder="Insira aqui alguma informação a respeito da sessão"
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="*:not-first:mt-1.5">
            <Label htmlFor="location">Tipo de sessão</Label>
            <Select value={typeAppointment} onValueChange={setTypeAppointment}>
              <SelectTrigger id="location" className="w-full">
                <SelectValue placeholder="Escolha a localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="casal">Casal</SelectItem>
                <SelectItem value="familiar">Familiar</SelectItem>
                <SelectItem value="avaliacao">Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 *:not-first:mt-1.5">
              <Label htmlFor="start-date">Data</Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant={"outline"}
                    className={cn(
                      "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "truncate",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      {startDate
                        ? format(startDate, "PPP", { locale: ptBR })
                        : "Escolha uma data"}
                    </span>
                    <RiCalendarLine
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    defaultMonth={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                        // If end date is before the new start date, update it to match the start date
                        setError(null);
                        setStartDateOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="min-w-28 *:not-first:mt-1.5">
                <Label htmlFor="start-time">Horário</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* <div className="flex items-center gap-2">
              <Checkbox
                id="all-day"
                checked={allDay}
                onCheckedChange={(checked) => setAllDay(checked === true)} />
              <Label htmlFor="all-day">All day</Label>
            </div> */}

          <div className="*:not-first:mt-1.5">
            <Label htmlFor="location">Local</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="w-full">
                <SelectValue value="remoto">Remoto</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="remoto">Remoto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <fieldset className="space-y-4">
            <legend className="text-foreground text-sm leading-none font-medium">
              Etiqueta
            </legend>
            <RadioGroup
              className="flex gap-1.5"
              defaultValue={colorOptions[0]?.value}
              value={color}
              onValueChange={(value) => setColor(value)}
            >
              {colorOptions.map((colorOption) => (
                <RadioGroupItem
                  key={colorOption.value}
                  id={`color-${colorOption.value}`}
                  value={colorOption.value}
                  aria-label={colorOption.label}
                  className={cn(
                    "size-6 shadow-none",
                    colorOption.bgClass,
                    colorOption.borderClass
                  )}
                />
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <DialogFooter className="flex-row sm:justify-between">
          {event?.id && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Delete event">
                  <RiDeleteBinLine size={16} aria-hidden="true" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja realmente excluir esta sessão?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDelete}
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
