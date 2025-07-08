"use client";

import { useState } from "react";
import { Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePatientSettings } from "@/hooks/usePatientSettings";
import { passwordSchema } from "@/schemas/patientSettingsSchema";

export default function SecurityForm() {
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const { handleSubmit, loading } = usePatientSettings({
    schema: passwordSchema,
    endpoint: "user/password",
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700 shadow-xl mb-8 animate-fade-up">
      <h2 className="text-2xl font-semibold text-primary-400 mb-6 flex items-center gap-2">
        <Lock className="w-6 h-6" /> Segurança
      </h2>

      <div className="space-y-4">
        <InputField
          label="Nova Senha"
          name="new_password"
          type="password"
          value={form.new_password}
          onChange={onChange}
        />
        <InputField
          label="Confirmar Nova Senha"
          name="confirm_password"
          type="password"
          value={form.confirm_password}
          onChange={onChange}
        />
        <Button
          onClick={() => handleSubmit(form)}
          disabled={loading}
          className="bg-primary text-white"
        >
          <Save size={18} className="mr-2" />
          {loading ? "Salvando..." : "Alterar Senha"}
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
