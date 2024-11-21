import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomError } from "~/data/models/errors";
import type {
  Registration,
  RegistrationPaginateResponse,
} from "~/data/models/registration";
import { updateRegistrationStatus } from "~/data/services/registration/registration-service";
import { toast } from "react-toastify";

const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    CustomError,
    { registration: Registration; newStatus: string }
  >(
    ({ registration, newStatus }) =>
      updateRegistrationStatus(registration, newStatus),
    {
      onMutate: async ({ registration, newStatus }) => {
        queryClient.setQueriesData<RegistrationPaginateResponse>(
          {
            queryKey: ["registrations"],
            exact: false,
          },
          (old) => {
            if (!old) return;
            return {
              ...old,
              data: old.data.map((reg) =>
                reg.id === registration.id ? { ...reg, status: newStatus } : reg
              ),
            };
          }
        );
      },
      onSuccess: () => {
        toast.success("Status atualizado com sucesso!");
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(["registrations"], context);
        toast.error(`Erro ao atualizar status: ${error.message}`);
      },
    }
  );
};

export default useUpdateRegistrationStatus;
