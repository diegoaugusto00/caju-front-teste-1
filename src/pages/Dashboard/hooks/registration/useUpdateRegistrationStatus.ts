import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CustomError } from '~/data/models/errors';
import type { Registration } from '~/data/models/registration';
import { updateRegistrationStatus } from '~/data/services/registration/registration-service';
import { toast } from 'react-toastify';

const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<void, CustomError, { registration: Registration; newStatus: string }>(
    ({registration, newStatus}) => updateRegistrationStatus(registration, newStatus),
    {
      onSuccess: () => {
        //TODO - em vez de invalidar a query passar o novo objeto para n precisa fazer outra requisição
        queryClient.invalidateQueries(['registrations']);
        toast.success('Status atualizado com sucesso!');
      },
      onError: (error) => {
        toast.error(`Erro ao atualizar status: ${error.message}`);
      },
    }
  );
};

export default useUpdateRegistrationStatus;