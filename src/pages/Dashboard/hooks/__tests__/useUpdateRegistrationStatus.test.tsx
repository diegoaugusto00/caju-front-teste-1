import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import { updateRegistrationStatus } from "~/data/services/registration/registration-service";
import { ReactNode } from "react";
import type {
  Registration,
  RegistrationPaginateResponse,
} from "~/data/models/registration";
import useUpdateRegistrationStatus from "../registration/useUpdateRegistrationStatus";

interface WrapperProps {
  children: ReactNode;
}

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("~/data/services/registration/registration-service", () => ({
  updateRegistrationStatus: jest.fn(),
}));

describe("useUpdateRegistrationStatus tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockRegistration: Registration = {
    id: "1",
    email: "test@test.com",
    employeeName: "Jhony Brabo",
    admissionDate: "2024-11-20",
    cpf: "12345678900",
    status: "REVIEW",
  };

  const mockInitialData: RegistrationPaginateResponse = {
    data: [mockRegistration],
    total: 1,
    currentPage: 1,
    totalPages: 1,
  };

  it("should update cache and show success message on successful status update", async () => {
    const newStatus = "APPROVED";
    (updateRegistrationStatus as jest.Mock).mockResolvedValueOnce(undefined);

    queryClient.setQueryData(["registrations"], mockInitialData);

    const { result } = renderHook(() => useUpdateRegistrationStatus(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({
        registration: mockRegistration,
        newStatus,
      });
    });

    const updatedData = queryClient.getQueryData<RegistrationPaginateResponse>([
      "registrations",
    ]);
    expect(updatedData?.data[0].status).toBe(newStatus);

    expect(updateRegistrationStatus).toHaveBeenCalledWith(
      mockRegistration,
      newStatus
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Status atualizado com sucesso!"
    );
  });

  it("should handle empty cache gracefully", async () => {
    const newStatus = "APPROVED";
    (updateRegistrationStatus as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useUpdateRegistrationStatus(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({
        registration: mockRegistration,
        newStatus,
      });
    });

    expect(updateRegistrationStatus).toHaveBeenCalledWith(
      mockRegistration,
      newStatus
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Status atualizado com sucesso!"
    );
  });
});
