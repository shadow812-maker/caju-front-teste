import { useEffect, useState } from "react";
import Columns from "../../components/Columns";
import * as S from "./styles";
import { SearchBar } from "../../components/Searchbar";
import api from "~/services/api";

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchCpf, setSearchCpf] = useState('');

  const fetchRegistrations = async () => {
    try {
      const { data } = await api.get(`/registrations?cpf=${searchCpf.replace(/\D/g, '')}`);
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [searchCpf]);

  const handleSearch = (cpf: string) => {
    setSearchCpf(cpf);
  };

  return (
    <S.Container>
      <SearchBar 
        onStatusChange={fetchRegistrations} 
        onSearch={handleSearch}
      />
      <Columns 
        registrations={registrations} 
        onStatusChange={fetchRegistrations} 
      />
    </S.Container>
  );
};

export default DashboardPage;
