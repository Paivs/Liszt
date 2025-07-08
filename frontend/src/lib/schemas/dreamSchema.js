import { z } from "zod";

export const dreamSchema = z.object({
  date: z.string().min(1, "Data obrigatória"),
  title: z.string().min(1, "Título obrigatório"),
  dream_description: z.string().min(1, "Descrição obrigatória"),
  emotions_list: z.string().min(1, "Descreva as emoções"),
  symbols_list: z.string().min(1, "Descreva os símbolos"),
  clarity: z.string().min(1, "Informe a clareza"),
  category: z.string().min(1, "Informe a categoria"),
});
