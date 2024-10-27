import { UseFormReturn } from 'react-hook-form';
import TextField from '~/components/TextField';
import Button from '~/components/Buttons';
import InputMask from 'react-input-mask';
import { FormData } from './validation';

type NewUserFormProps = {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
};

export const NewUserForm = ({ form, onSubmit }: NewUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        placeholder="Nome" 
        label="Nome" 
        error={errors.employeeName?.message}
        isValid={dirtyFields.employeeName && !errors.employeeName}
        {...register("employeeName")}
      />
      <TextField 
        placeholder="Email" 
        label="Email" 
        type="email"
        error={errors.email?.message}
        isValid={dirtyFields.email && !errors.email}
        {...register("email")}
      />
      <TextField 
        placeholder="CPF" 
        label="CPF"
        error={errors.cpf?.message}
        isValid={dirtyFields.cpf && !errors.cpf}
        mask="999.999.999-99"
        {...register("cpf")}
        as={InputMask}
      />
      <TextField 
        label="Data de admissão" 
        type="date"
        error={errors.admissionDate?.message}
        isValid={dirtyFields.admissionDate && !errors.admissionDate}
        {...register("admissionDate")}
      />
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};