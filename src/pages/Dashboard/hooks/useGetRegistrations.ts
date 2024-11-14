// src/hooks/useGetRegistrations.ts
import { useQuery } from '@tanstack/react-query';
import type { CustomError } from '~/data/models/errors';
import type { RegistrationPaginateResponse } from '~/data/models/registration';
import { getRegistrations } from '~/data/services/registration/registration-service';

interface UseGetRegistrationsParams {
    currentPage: number;
    pageSize?: number;
    cpf?: string;
    status?: string;
}

interface UseGetRegistrationsReturn {
    registrations: RegistrationPaginateResponse['data'] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: CustomError | null;
    refetch: () => void;
    totalPages: number;
    totalRegistrations: number;
    currentPage: number;
    isFetching: boolean;
}

const useGetRegistrations = ({
    currentPage,
    pageSize = 5,
    cpf,
    status
}: UseGetRegistrationsParams): UseGetRegistrationsReturn => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery<RegistrationPaginateResponse, CustomError>(
        ['registrations', currentPage, pageSize, cpf, status],
        () => getRegistrations(currentPage, pageSize, cpf, status),
        {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            retry: false,
            keepPreviousData: true,
        },
    );

    return {
        registrations: data?.data,
        isLoading,
        isError,
        error: error || null,
        refetch,
        totalPages: data?.totalPages || 1,
        totalRegistrations: data?.total || 0,
        currentPage: data?.currentPage || currentPage,
        isFetching
    };
};

export default useGetRegistrations;