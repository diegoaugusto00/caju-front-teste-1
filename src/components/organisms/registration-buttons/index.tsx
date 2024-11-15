import * as S from "./styles";
import { HiOutlineTrash } from "react-icons/hi";
import { ButtonSmall } from "~/components/atoms/Buttons";

//TODO - Mudar as constantes para outra pasta para evitar chamar o pages aqui
import { REVIEW } from "~/pages/Dashboard/components/Columns/constants";

type RegistrationButtonsProps = {
    status: string;
    onApprove?: () => void;
    onReject?: () => void;
    onReview?: () => void;
};

export const RegistrationButtons: React.FC<RegistrationButtonsProps> = ({
    status,
    onApprove,
    onReject,
    onReview,
}) => {
    //TODO - Implementar factory para evitar repetições, usar record para mapear os status
    if (status === REVIEW) {
        return (
            <S.Actions>
                <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={onReject}>
                    Reprovar
                </ButtonSmall>
                <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={onApprove}>
                    Aprovar
                </ButtonSmall>
                <HiOutlineTrash />
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
