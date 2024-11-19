import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { UseGetRegistrationsReturn } from "../../hooks/registration/types";
import { useMemo } from "react";
import {
  ApprovedFilterStrategy,
  ReprovedFilterStrategy,
  ReviewFilterStrategy,
} from "./strategy/filterStrategies";
import type { IFilterStrategy } from "./strategy/filterStrategyInterface";
import { STATUS } from "../../constants";

const allColumns = [
  { status: STATUS.REVIEW, title: "Pronto para revisar" },
  { status: STATUS.APPROVED, title: "Aprovado" },
  { status: STATUS.REPROVED, title: "Reprovado" },
];

type ColumnsProps = {
  registrationsQuery: UseGetRegistrationsReturn;
};

const Collumns: React.FC<ColumnsProps> = ({ registrationsQuery }) => {
  const { registrations = [] } = registrationsQuery;

  const renderRegistrationCards = useMemo(() => {
    const filterStrategies = new Map<string, IFilterStrategy>([
      [STATUS.REVIEW, new ReviewFilterStrategy()],
      [STATUS.APPROVED, new ApprovedFilterStrategy()],
      [STATUS.REPROVED, new ReprovedFilterStrategy()],
    ]);

    return allColumns.map((column) => {
      const strategy = filterStrategies.get(column.status);
      const filteredRegistrations = strategy?.filter(registrations);

      return (
        <S.Column status={column.status} key={column.title}>
          <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
          <S.CollumContent>
            {!filteredRegistrations || filteredRegistrations.length === 0 ? (
              <S.EmptyContent>Nenhum Registro Encontrado.</S.EmptyContent>
            ) : (
              filteredRegistrations.map((registration, index) => (
                <RegistrationCard registration={registration} key={index} />
              ))
            )}
          </S.CollumContent>
        </S.Column>
      );
    });
  }, [registrations]);

  return <S.Container>{renderRegistrationCards}</S.Container>;
};

export default Collumns;
