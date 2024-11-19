import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CustomError } from '~/data/models/errors';
import { deleteRegistration } from '~/data/services/registration/registration-service';
import { toast } from 'react-toastify';

const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation<void, CustomError, string>(
    (id: string) => deleteRegistration(id),
    {
      onSuccess: () => {
        //TODO - em vez de invalidar a query passar o novo objeto para n precisa fazer outra requisição
        queryClient.invalidateQueries(['registrations']);
        toast.success('Registro deletado com sucesso!');
      },
      onError: (error) => {
        toast.error(`Erro ao excluir registro: ${error.message}`);
      },
    }
  );
};

export default useDeleteRegistration;