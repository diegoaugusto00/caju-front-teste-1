import * as S from "./styles";
import Button from "~/components/atoms/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/atoms/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { z } from "zod";
import { formSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "~/components/molecules/FormField";
import useCreateRegistration from "./hooks/useCreateRegistration";
import { STATUS } from "../Dashboard/constants";
import LoadingButton from "~/components/atoms/Buttons/LoadingButton";

type FormData = z.infer<typeof formSchema>;
const NewUserPage = () => {
  const history = useHistory();
  const createRegistrationMutation = useCreateRegistration();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const { name, ...formData } = data;
    const registrationData = {
      ...formData,
      status: STATUS.REVIEW,
      employeeName: name,
    };
    await createRegistrationMutation.mutateAsync(registrationData);
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <form onSubmit={handleSubmit(onSubmit)} role="form">
          <S.FormContainer>
            <FormField
              id="name"
              {...register("name")}
              placeholder="Nome"
              label="Nome"
              error={errors.name?.message}
              aria-label="Nome"
            />
            <FormField
              id="email"
              {...register("email")}
              placeholder="Email"
              label="Email"
              error={errors.email?.message}
              aria-label="Email"
            />
            <FormField
              id="cpf"
              {...register("cpf")}
              placeholder="CPF"
              label="CPF"
              error={errors.cpf?.message}
              aria-label="CPF"
              mask="cpf"
              maxLength={14}
            />
            <FormField
              id="admissionDate"
              {...register("admissionDate")}
              label="Data de admissão"
              type="date"
              error={errors.admissionDate?.message}
              aria-label="Data de admissão"
            />
            <LoadingButton
              disabled={createRegistrationMutation.isLoading}
              loading={createRegistrationMutation.isLoading}
              type="submit"
            >
              Cadastrar
            </LoadingButton>
          </S.FormContainer>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
