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
import { useConfirmDialogStore } from "~/store/useConfirmDialogStore";
import { createDialogHandler, DialogAction } from "./dialogHandler";

type RegistrationCardProps = {
  registration: Registration;
};

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
}) => {
  const { setOpenConfirmDialog, setCloseConfirmDialog } =
    useConfirmDialogStore();
  const updateStatusMutation = useUpdateRegistrationStatus();
  const deleteRegistrationMutation = useDeleteRegistration();

  const handleAction = async (action: DialogAction) => {
    if (action === "DELETE") {
      await deleteRegistrationMutation.mutateAsync(registration.id);
    } else {
      const statusMap = {
        APPROVE: STATUS.APPROVED,
        REJECT: STATUS.REPROVED,
        REVIEW: STATUS.REVIEW,
      };
      await updateStatusMutation.mutateAsync({
        registration: registration,
        newStatus: statusMap[action],
      });
    }
    setCloseConfirmDialog();
  };

  const handleDialog = createDialogHandler(
    handleAction,
    setOpenConfirmDialog,
    setCloseConfirmDialog
  );

  const onApprove = handleDialog("APPROVE", registration.employeeName);
  const onReject = handleDialog("REJECT", registration.employeeName);
  const onReview = handleDialog("REVIEW", registration.employeeName);
  const onDelete = handleDialog("DELETE", registration.employeeName);

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
