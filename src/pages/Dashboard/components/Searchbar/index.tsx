import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/atoms/Buttons";
import { IconButton } from "~/components/atoms/Buttons/IconButton";
import TextField from "~/components/atoms/Inputs/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "~/pages/hooks/useDebounce";
import SelectComponent from "~/components/atoms/Inputs/Select";
import { removeNonDigits } from "~/utils/inputMask";

type SearchBarProps = {
  onSearch?: (cpf: string, status: string) => void;
};

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "REVIEW", label: "Pendente" },
  { value: "APPROVED", label: "Aprovado" },
  { value: "REPROVED", label: "Reprovado" },
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const history = useHistory();
  const [searchCPFValue, setSearchCPFValue] = useState<string>("");
  const [searchStatusValue, setSearhStatusValue] = useState<string>("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const debouncedSearchValue = useDebounce(searchCPFValue, 500);

  useEffect(() => {
    if (onSearch) {
      const unmaskedValue = removeNonDigits(debouncedSearchValue);
      onSearch(unmaskedValue, searchStatusValue);
    }
  }, [debouncedSearchValue, onSearch, searchStatusValue]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearhStatusValue(event.target.value);
  };

  const onRefetch = useCallback(() => {
    setSearchCPFValue("");
    setSearhStatusValue("");
  }, [setSearchCPFValue]);

  return (
    <S.Container>
      <S.Row>
        <TextField
          placeholder="Digite um CPF válido"
          maxLength={14}
          mask="cpf"
          value={searchCPFValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchCPFValue(e.target.value)
          }
        />
        <SelectComponent
          value={searchStatusValue}
          placeholder="Selecione um status"
          options={statusOptions}
          onChange={handleSelectChange}
        />
      </S.Row>
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
