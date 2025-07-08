// schemas/patientSettingsSchema.js
import { z } from "zod";

export const patientProfileSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório."),
  email: z.string().email("Email inválido.")
});

export const patientDataSchema = z.object({
  cpf: z.string().min(11, "CPF obrigatório."),
  phone: z.string().min(10, "Telefone inválido."),
  emergency_contact_name: z.string().min(3, "Nome do contato obrigatório."),
  emergency_contact_phone: z.string().min(10, "Telefone do contato obrigatório."),
  address: z.string().min(5, "Endereço obrigatório.")
});

export const passwordSchema = z
  .object({
    last_password: z.string().min(3, "Senha atual é obrigatória"),
    new_password: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
    confirm_password: z.string().min(6, "Confirmação obrigatória."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
  });

