import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomError } from "~/data/models/errors";
import { deleteRegistration } from "~/data/services/registration/registration-service";
import { toast } from "react-toastify";
import { RegistrationPaginateResponse } from "~/data/models/registration";

const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation<void, CustomError, string>(
    (id: string) => deleteRegistration(id),
    {
      onMutate: async (deletedId) => {
        queryClient.setQueriesData<RegistrationPaginateResponse>(
          {
            queryKey: ["registrations"],
            exact: false,
          },
          (old) => {
            if (!old) return;
            return {
              ...old,
              data: old.data.filter((reg) => reg.id !== deletedId),
              total: old.total - 1,
            };
          }
        );
      },
      onSuccess: () => {
        toast.success("Registro deletado com sucesso!");
      },
      onError: (error) => {
        queryClient.invalidateQueries(["registrations"]);
        toast.error(`Erro ao excluir registro: ${error.message}`);
      },
    }
  );
};

export default useDeleteRegistration;
