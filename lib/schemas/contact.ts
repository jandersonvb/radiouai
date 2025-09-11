// src/lib/schemas/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  company: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  plan: z.string().min(1, "Selecione um plano"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Conte um pouco sobre sua necessidade (mín. 10 caracteres)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
