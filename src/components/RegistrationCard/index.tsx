import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import api from "~/services/api";

type Props = {
  data: any;
  onStatusChange?: () => void;
};

const RegistrationCard = ({ data, onStatusChange }: Props) => {
  // Create unique IDs for this card's controls
  const cardId = `card-${data.id}`;
  const statusControlId = `status-control-${data.id}`;
  const deleteControlId = `delete-control-${data.id}`;

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    // Query only buttons within this card
    const buttons = document.querySelectorAll(`[data-card-id="${cardId}"]`);
    const maxIndex = buttons.length - 1;
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = index === maxIndex ? 0 : index + 1;
        (buttons[nextIndex] as HTMLElement).focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = index === 0 ? maxIndex : index - 1;
        (buttons[prevIndex] as HTMLElement).focus();
        break;
    }
  };

  const handleStatusChange = async (newStatus: 'APPROVED' | 'REPROVED' | 'REVIEW') => {
    // Add confirmation dialog
    const statusMessages = {
      APPROVED: 'aprovar',
      REPROVED: 'reprovar',
      REVIEW: 'enviar para revisão'
    };
    
    const confirmed = window.confirm(`Tem certeza que deseja ${statusMessages[newStatus]} este registro?`);
    if (!confirmed) return;

    try {
      await api.put(`/registrations/${data.id}`, {
        ...data,
        status: newStatus
      });
      window.alert('Status atualizado com sucesso!');
      onStatusChange?.();
    } catch (error) {
      window.alert('Erro ao atualizar status!');
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este registro?');
    if (!confirmed) return;

    try {
      await api.delete(`/registrations/${data.id}`);
      onStatusChange?.();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };


  return (
    <S.Card id={cardId}>
      <S.IconAndText>
        <HiOutlineUser aria-hidden="true" />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail aria-hidden="true" />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar aria-hidden="true" />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions role="tablist" aria-label={`Ações do registro ${data.employeeName}`}>
        <ButtonSmall
          bgcolor="rgb(255, 145, 154)"
          onClick={() => handleStatusChange('REPROVED')}
          title="Reprovar registro"
          role="tab"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          aria-selected="false"
          aria-controls={statusControlId}
          data-card-id={cardId}
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          onClick={() => handleStatusChange('APPROVED')}
          title="Aprovar registro"
          role="tab"
          tabIndex={-1}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          aria-selected="false"
          aria-controls={statusControlId}
          data-card-id={cardId}
        >
          Aprovar
        </ButtonSmall>
        <ButtonSmall
          bgcolor="#ff8858"
          onClick={() => handleStatusChange('REVIEW')}
          title="Revisar novamente"
          role="tab"
          tabIndex={-1}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          aria-selected="false"
          aria-controls={statusControlId}
          data-card-id={cardId}
        >
          Revisar novamente
        </ButtonSmall>
        <button
          onClick={handleDelete}
          style={{
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
          title="Excluir registro"
          role="tab"
          tabIndex={-1}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          aria-selected="false"
          aria-controls={deleteControlId}
          data-card-id={cardId}
        >
          <HiOutlineTrash />
        </button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
