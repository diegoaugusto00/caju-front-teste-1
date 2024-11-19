import axios from 'axios';
import type { Registration, RegistrationPaginateResponse } from '~/data/models/registration';

export const getRegistrations = async (
    page = 1,
    limit = 10,
    cpf?: string,
    status?: string
): Promise<RegistrationPaginateResponse> => {
    try {
        const response = await axios.get('http://localhost:3002/registrations', {
            params: {
                _page: page,
                _limit: limit,
                cpf,
                status
            },
            headers: {
                Accept: 'application/json',
            },
        });

        const totalCount = parseInt(response.headers['x-total-count'] || '0');
        const totalPages = Math.ceil(totalCount / limit);
        return {
            data: response.data,
            total: totalCount,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        throw error;
    }
};

export const updateRegistrationStatus = async (
    registration: Registration,
    status: string
  ): Promise<void> => {
    const { id } = registration;
    try {
        await axios.put(`http://localhost:3002/registrations/${id}`, { ...registration, status }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    } catch (error) {
      throw error;
    }
  };

  export const deleteRegistration = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3002/registrations/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  };