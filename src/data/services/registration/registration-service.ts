import axios from "axios";
import type {
  Registration,
  RegistrationPaginateResponse,
} from "~/data/models/registration";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3002";

export const getRegistrations = async (
  page = 1,
  limit = 10,
  cpf?: string,
  status?: string
): Promise<RegistrationPaginateResponse> => {
  try {
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
    await axios.put(
      `${API_URL}/registrations/${id}`,
      { ...registration, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteRegistration = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/registrations/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};
