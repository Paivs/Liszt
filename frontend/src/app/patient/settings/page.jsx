// app/settings/page.jsx
import { apiServer } from "@/lib/api-server";
import PatientProfileForm from "@/components/blocks/settings/PatientProfileForm";
import PatientDataForm from "@/components/blocks/settings/PatientDataForm";
import SecurityForm from "@/components/blocks/settings/SecurityForm";

export default async function SettingsPage() {
  let user = { name: "", email: "" };
  let patientUser = {
    name: "",
    cpf: "",
    phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    address: "",
  };

  try {
    const data = await apiServer.get("user/profile");

    if (data.user) {
      user = {
        name: data.user.name,
        email: data.user.email,
      };
    }

    if (data.patientUser) {
      patientUser = {
        name: data.patientUser.name,
        cpf: data.patientUser.cpf,
        phone: data.patientUser.phone,
        emergency_contact_name: data.patientUser.emergency_contact_name,
        emergency_contact_phone: data.patientUser.emergency_contact_phone,
        address: data.patientUser.address,
      };
    }
  } catch (err) {
    console.error("Erro ao buscar dados do usuário:", err.message);
  }

  return (
    <section className="py-8 max-w-3xl container mx-auto p-2 animate-fade-in">
      <h1 className="text-4xl font-bold tracking-tight mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Configurações
      </h1>
      
      <PatientProfileForm initialData={user} />
      <PatientDataForm initialData={patientUser} />
      <SecurityForm />
    </section>
  );
}
