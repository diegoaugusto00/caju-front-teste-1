import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { UseGetRegistrationsReturn } from "../../hooks/registration/types";
import { useMemo } from "react";
import {
  ApprovedFilterStrategy,
  IFilterStrategy,
  ReprovedFilterStrategy,
  ReviewFilterStrategy,
} from "./strategy/filterStrategies";
import { STATUS } from "../../constants";
import SkeletonCard from "~/components/molecules/SkeletonCard";

const allColumns = [
  { status: STATUS.REVIEW, title: "Pronto para revisar" },
  { status: STATUS.APPROVED, title: "Aprovado" },
  { status: STATUS.REPROVED, title: "Reprovado" },
];

type ColumnsProps = {
  registrationsQuery: UseGetRegistrationsReturn;
};

const Collumns: React.FC<ColumnsProps> = ({ registrationsQuery }) => {
  const { registrations = [], isFetching } = registrationsQuery;

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
        <S.Column
          status={column.status}
          key={column.title}
          data-testid={`column-${column.status}`}
        >
          <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
          <S.CollumContent>
            {isFetching ? (
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${column.status}-${index}`} />
              ))
            ) : !filteredRegistrations || filteredRegistrations.length === 0 ? (
              <S.EmptyContent>Nenhum Registro Encontrado.</S.EmptyContent>
            ) : (
              filteredRegistrations.map((registration) => (
                <RegistrationCard
                  registration={registration}
                  key={registration.id || `registration-${column.status}`}
                />
              ))
            )}
          </S.CollumContent>
        </S.Column>
      );
    });
  }, [registrations, isFetching]);

  return <S.Container>{renderRegistrationCards}</S.Container>;
};

export default Collumns;
