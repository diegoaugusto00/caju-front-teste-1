import axios from "axios";
import type {
  Registration,
  RegistrationPaginateResponse,
} from "~/data/models/registration";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3002";

export const getRegistrations = async (
  page = 1,
  limit = 20,
  cpf?: string,
  status?: string
): Promise<RegistrationPaginateResponse> => {
  const response = await axios.get(`${API_URL}/registrations`, {
    params: {
      _page: page,
      _limit: limit,
      cpf,
      status,
    },
    headers: {
      Accept: "application/json",
    },
  });

  const totalCount = parseInt(response.headers["x-total-count"] || "0");
  const totalPages = Math.ceil(totalCount / limit);
  return {
    data: response.data,
    total: totalCount,
    totalPages,
    currentPage: page,
  };
};

export const createRegistration = async (
  data: Omit<Registration, "id">
): Promise<Registration> => {
  const response = await axios.post(`${API_URL}/registrations`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const updateRegistrationStatus = async (
  registration: Registration,
  status: string
): Promise<void> => {
  const { id } = registration;
  await axios.put(
    `${API_URL}/registrations/${id}`,
    { ...registration, status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteRegistration = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/registrations/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
