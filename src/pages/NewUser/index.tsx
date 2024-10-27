
import * as S from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { NewUserForm } from './NewUserForm';
import { useNewUser } from '~/hooks/useNewUser';

const NewUserPage = () => {
  const { form, goToHome, handleSubmit } = useNewUser();

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <NewUserForm 
          form={form} 
          onSubmit={handleSubmit}
        />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
