import axios from 'axios';
import { Registration } from '../../models/registration';
import { getRegistrations } from './registration-service';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Registration Service', () => {
    const mockRegistrations: Registration[] = [
        {
            id: "1",
            admissionDate: "22/10/2023",
            email: "test1@example.com",
            employeeName: "Test User 1",
            status: "APROVED",
            cpf: "12345678901"
        },
        {
            id: "2",
            admissionDate: "23/10/2023",
            email: "test2@example.com",
            employeeName: "Test User 2",
            status: "REVIEW",
            cpf: "98765432101"
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getRegistrations', () => {
        it('should fetch registrations with default pagination', async () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: mockRegistrations,
                headers: {
                    'x-total-count': '2'
                }
            });

            const result = await getRegistrations();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/registrations',
                {
                    params: {
                        _page: 1,
                        _limit: 10,
                        cpf: undefined,
                        status: undefined
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
            expect(result).toEqual({
                data: mockRegistrations,
                total: 2,
                totalPages: 1,
                currentPage: 1
            });
        });

        it('should fetch registrations with custom pagination', async () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: mockRegistrations,
                headers: {
                    'x-total-count': '40'
                }
            });

            const result = await getRegistrations(2, 20);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/registrations',
                {
                    params: {
                        _page: 2,
                        _limit: 20,
                        cpf: undefined,
                        status: undefined
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
            expect(result).toEqual({
                data: mockRegistrations,
                total: 40,
                totalPages: 2,
                currentPage: 2
            });
        });

        it('should handle API errors properly', async () => {
            const errorMessage = 'Network Error';
            mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(getRegistrations()).rejects.toThrow(errorMessage);
        });

        it('should handle empty response', async () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: [],
                headers: {
                    'x-total-count': '0'
                }
            });

            const result = await getRegistrations();
            expect(result).toEqual({
                data: [],
                total: 0,
                totalPages: 0,
                currentPage: 1
            });
        });

        it('should handle response with filters', async () => {
            const filteredRegistrations = [mockRegistrations[0]];
            mockedAxios.get.mockResolvedValueOnce({
                data: filteredRegistrations,
                headers: {
                    'x-total-count': '1'
                }
            });

            const result = await getRegistrations(1, 10, '12345678901', 'APROVED');

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:3000/registrations',
                {
                    params: {
                        _page: 1,
                        _limit: 10,
                        cpf: '12345678901',
                        status: 'APROVED'
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
            expect(result).toEqual({
                data: filteredRegistrations,
                total: 1,
                totalPages: 1,
                currentPage: 1
            });
        });
    });
});
