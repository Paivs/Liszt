"use client";

import { useState } from "react";
import { usePatientSettings } from "@/hooks/usePatientSettings";
import { patientProfileSchema } from "@/schemas/patientSettingsSchema";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientProfileForm({ initialData }) {
  const [form, setForm] = useState(initialData);

  const { handleSubmit, loading } = usePatientSettings({
    schema: patientProfileSchema,
    endpoint: "user/profile",
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 shadow-xl mb-8 animate-fade-up">
      <h2 className="text-2xl font-semibold text-primary-400 mb-6 flex items-center gap-2">
        <Save className="w-6 h-6" /> Perfil
      </h2>
      <div className="space-y-4">
        <InputField
          label="Nome"
          name="name"
          value={form.name}
          onChange={onChange}
        />
        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={onChange}
          type="email"
        />
        <Button
          onClick={() => handleSubmit(form)}
          disabled={loading}
          className="bg-primary text-white"
        >
          <Save size={18} className="mr-2" />
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
      />
    </div>
  );
}
