import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomError } from "~/data/models/errors";
import type { Registration } from "~/data/models/registration";
import { createRegistration } from "~/data/services/registration/registration-service";
import { toast } from "react-toastify";

const useCreateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation<Registration, CustomError, Omit<Registration, "id">>(
    (registrationData) => createRegistration(registrationData),
    {
      //TODO - invalidar cache em vez de adicionar novo registro
      onSuccess: (newRegistration) => {
        queryClient.setQueryData(
          ["registrations"],
          (old: Registration[] = []) => [...old, newRegistration]
        );
        toast.success("Registro criado com sucesso!");
      },
      onError: (error) => {
        toast.error(`Erro ao criar registro: ${error.message}`);
      },
    }
  );
};

export default useCreateRegistration;
