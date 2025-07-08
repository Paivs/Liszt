import { z } from "zod";

export const emotionSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  mood: z.string().min(1, "Selecione uma emoção"),
  intensity: z
    .array(z.number())
    .nonempty("Intensidade é obrigatória")
    .refine((arr) => arr[0] >= 1 && arr[0] <= 10, {
      message: "Intensidade deve estar entre 1 e 10",
    }),
  description: z.string().min(1, "Descrição é obrigatória"),
  emotion_trigger: z.string().optional(),
});
