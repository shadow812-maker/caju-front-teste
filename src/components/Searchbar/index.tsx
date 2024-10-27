import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useState } from "react";
import InputMask from 'react-input-mask';

type Props = {
  onStatusChange?: () => void;
  onSearch: (cpf: string) => void;
};

export const SearchBar = ({ onStatusChange, onSearch }: Props) => {
  const history = useHistory();
  const [cpf, setCpf] = useState('');

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(value);
    onSearch(value);
  };

  return (
    <S.Container>
      <TextField  
        placeholder="Digite um CPF válido" 
        value={cpf}
        onChange={handleSearch}
        as={InputMask}
        mask="999.999.999-99"
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={
          () => {
            onStatusChange && onStatusChange();
            const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
            handleSearch(event);
          }
        }>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
