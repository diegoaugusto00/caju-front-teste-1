import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { RegistrationButtons } from "~/components/organisms/registration-buttons";
import { Registration } from "~/data/models/registration";



type RegistrationCardProps = {
  registration: Registration;
};

const RegistrationCard: React.FC<RegistrationCardProps> = ({ registration }) => {
  const onApprove = () => {
    console.log("approved");
  };

  const onReject = () => {
    console.log("rejected");
  };

  const onReview = () => {
    console.log("reviewed");
  };

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
      />
    </S.Card>
  );
};

export default RegistrationCard;
