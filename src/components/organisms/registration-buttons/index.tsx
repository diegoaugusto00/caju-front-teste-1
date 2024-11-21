import * as S from "./styles";
import { HiOutlineTrash } from "react-icons/hi";
import { ButtonSmall } from "~/components/atoms/Buttons";
import { IconButton } from "~/components/atoms/Buttons/IconButton";

type RegistrationButtonsProps = {
  status: string;
  onApprove?: () => void;
  onReject?: () => void;
  onReview?: () => void;
  onDelete?: () => void;
};

const DeleteButton = ({
  onDelete,
}: Pick<RegistrationButtonsProps, "onDelete">) => (
  <IconButton aria-label="delete" onClick={onDelete} noStyle>
    <HiOutlineTrash />
  </IconButton>
);

const buttonMap = new Map<string, React.FC<RegistrationButtonsProps>>([
  [
    "REVIEW",
    ({ onReject, onApprove, onDelete }) => (
      <>
        <S.ButtonGroup>
          <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={onReject}>
            Reprovar
          </ButtonSmall>
          <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={onApprove}>
            Aprovar
          </ButtonSmall>
        </S.ButtonGroup>
        <DeleteButton onDelete={onDelete} />
      </>
    ),
  ],
  [
    "DEFAULT",
    ({ onReview, onDelete }) => (
      <>
        <ButtonSmall bgcolor="#ff8858" onClick={onReview}>
          Revisar novamente
        </ButtonSmall>
        <DeleteButton onDelete={onDelete} />
      </>
    ),
  ],
]);

export const RegistrationButtons: React.FC<RegistrationButtonsProps> = ({
  status,
  onApprove,
  onReject,
  onReview,
  onDelete,
}) => {
  //TODO - tratar um status não mapeado
  const getButtonsByStatus = (props: RegistrationButtonsProps) => {
    const ButtonComponent =
      buttonMap.get(props.status) || buttonMap.get("DEFAULT")!;
    return ButtonComponent(props);
  };
  return (
    <S.Actions>
      {getButtonsByStatus({ status, onApprove, onReject, onReview, onDelete })}
    </S.Actions>
  );
};
