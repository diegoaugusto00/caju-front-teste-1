import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { RegistrationButtons } from "~/components/organisms/registration-buttons";
import { Registration } from "~/data/models/registration";
import useUpdateRegistrationStatus from "../../hooks/registration/useUpdateRegistrationStatus";
import useDeleteRegistration from "../../hooks/registration/useDeleteRegistration";
import { STATUS } from "../../constants";

type RegistrationCardProps = {
  registration: Registration;
};

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
}) => {
  const updateStatusMutation = useUpdateRegistrationStatus();
  const deleteRegistrationMutation = useDeleteRegistration();

  const updateStatus = (newStatus: string) => {
    updateStatusMutation.mutate({
      registration: registration,
      newStatus,
    });
  };

  const onApprove = () => updateStatus(STATUS.APPROVED);
  const onReject = () => updateStatus(STATUS.REPROVED);
  const onReview = () => updateStatus(STATUS.REVIEW);
  const onDelete = () => deleteRegistrationMutation.mutate(registration.id);

  return (
    <S.Card data-testid="registration-card">
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{registration.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{registration.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{registration.admissionDate}</span>
      </S.IconAndText>
      <RegistrationButtons
        status={registration.status}
        onApprove={onApprove}
        onReject={onReject}
        onReview={onReview}
        onDelete={onDelete}
      />
    </S.Card>
  );
};

export default RegistrationCard;
