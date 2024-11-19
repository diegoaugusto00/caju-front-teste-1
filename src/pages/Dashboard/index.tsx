import Collumns from "./components/Columns";
import * as S from "./styles";

import useGetRegistrations from "./hooks/registration/useGetRegistrations";
import { UseGetRegistrationsReturn } from "./hooks/registration/types";
import { SearchBar } from "./components/Searchbar";
import { useState } from "react";

const DashboardPage = () => {
  const [cpfFilter, setCpfFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const registrationsQuery: UseGetRegistrationsReturn = useGetRegistrations({
    currentPage: 1,
    cpf: cpfFilter,
    status: statusFilter,
  });

  const handleSearch = (cpf: string, status: string) => {
    setCpfFilter(cpf);
    setStatusFilter(status);
  };

  return (
    <S.Container>
      <SearchBar onSearch={handleSearch} />
      <Collumns registrationsQuery={registrationsQuery} />
    </S.Container>
  );
};
export default DashboardPage;
