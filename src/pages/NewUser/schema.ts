import { z } from "zod";
import {
  isValidCPF,
  isValidFullName,
  isValidFullName as isValidName,
} from "~/utils/validators";
import { removeNonDigits } from "~/utils/inputMask";

export const formSchema = z.object({
  name: z.string().refine(
    (name) => isValidFullName(name).isValid,
    (name) => ({
      message: isValidFullName(name).message || "Nome inválido",
    })
  ),

  email: z
    .string()
    .min(5, "Email deve ter no mínimo 5 caracteres")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .email("Email inválido"),

  cpf: z
    .string()
    .pipe(z.string().transform((val) => removeNonDigits(val)))
    .pipe(
      z
        .string()
        .length(11, "CPF deve ter 11 dígitos")
        .refine((val) => isValidCPF(val), {
          message: "CPF inválido",
        })
    ),

  admissionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de admissão obrigatória")
    .refine((date) => {
      const admissionDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Considera apenas a data sem a hora
      return admissionDate <= today;
    }, "Data de admissão deve ser menor ou igual a data atual"),
});
