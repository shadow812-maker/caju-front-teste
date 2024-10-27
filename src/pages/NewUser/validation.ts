import * as yup from "yup";

export const schema = yup.object().shape({
  employeeName: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .test('space', 'Nome deve conter pelo menos um espaço', (value) => value?.includes(' '))
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Formato de email inválido"
    ),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  admissionDate: yup
    .string()
    .required("Data de admissão é obrigatória")
});

export type FormData = {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
};