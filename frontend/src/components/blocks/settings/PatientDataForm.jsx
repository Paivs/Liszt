// components/settings/PatientDataForm.jsx
"use client";

import { useState } from "react";
import { usePatientSettings } from "@/hooks/usePatientSettings";
import { patientDataSchema } from "@/schemas/patientSettingsSchema";
import { Save, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientDataForm({ initialData }) {
  const [form, setForm] = useState(initialData);

  const { handleSubmit, loading } = usePatientSettings({
    schema: patientDataSchema,
    endpoint: "user/patient-data", // ajuste conforme seu backend
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 shadow-xl mb-8 animate-fade-up">
      <h2 className="text-2xl font-semibold text-primary-400 mb-6 flex items-center gap-2">
        <Contact className="w-6 h-6" /> Informações do Paciente
      </h2>

      <div className="space-y-4">
        <InputField label="CPF" name="cpf" value={form.cpf} onChange={onChange} />
        <InputField label="Telefone" name="phone" value={form.phone} onChange={onChange} />
        <InputField label="Contato de Emergência" name="emergency_contact_name" value={form.emergency_contact_name} onChange={onChange} />
        <InputField label="Telefone de Emergência" name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={onChange} />
        <InputField label="Endereço" name="address" value={form.address} onChange={onChange} />

        <Button onClick={() => handleSubmit(form)} disabled={loading} className="bg-primary text-white">
          <Save size={18} className="mr-2" />
          {loading ? "Salvando..." : "Salvar Informações"}
        </Button>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
      />
    </div>
  );
}
