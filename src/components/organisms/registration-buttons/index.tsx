import * as S from "./styles";
import { HiOutlineTrash } from "react-icons/hi";
import { ButtonSmall } from "~/components/atoms/Buttons";
import { IconButton } from "~/components/atoms/Buttons/IconButton";
import { STATUS } from "~/pages/Dashboard/constants";

//TODO - Mudar as constantes para outra pasta para evitar chamar o pages aqui

type RegistrationButtonsProps = {
  status: string;
  onApprove?: () => void;
  onReject?: () => void;
  onReview?: () => void;
  ondelete?: () => void;
};

export const RegistrationButtons: React.FC<RegistrationButtonsProps> = ({
  status,
  onApprove,
  onReject,
  onReview,
  ondelete,
}) => {
  //TODO - Implementar factory para evitar repetições, usar record para mapear os status
  if (status === STATUS.REVIEW) {
    return (
      <S.Actions>
        <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={onReject}>
          Reprovar
        </ButtonSmall>
        <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={onApprove}>
          Aprovar
        </ButtonSmall>
        <IconButton aria-label="refetch" onClick={ondelete} noStyle>
          <HiOutlineTrash />
        </IconButton>
      </S.Actions>
    );
  }

  return (
    <S.Actions>
      <ButtonSmall bgcolor="#ff8858" onClick={onReview}>
        Revisar novamente
      </ButtonSmall>
      <HiOutlineTrash />
    </S.Actions>
  );
};
