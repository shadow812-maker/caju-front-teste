import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Registration = {
  id: string;
  employeeName: string;
  email: string;
  admissionDate: string;
  status: 'REVIEW' | 'APPROVED' | 'REPROVED';
};

type Props = {
  registrations?: Registration[];
  onStatusChange?: () => void;
};

const Columns = ({ registrations, onStatusChange }: Props) => {
  
  return (
    <S.Container>
      {allColumns.map((column) => {
        const filteredRegistrations = registrations?.filter(
          (reg) => reg.status === column.status
        ) || [];

        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent role="tabpanel" aria-labelledby={column.title}>
                {filteredRegistrations.map((registration) => {
                  return (
                    <RegistrationCard
                      aria-label={registration.id}
                      data={registration}
                      key={registration.id}
                      onStatusChange={onStatusChange}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Columns;
