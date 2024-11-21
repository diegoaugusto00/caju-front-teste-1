import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import { deleteRegistration } from "~/data/services/registration/registration-service";
import { ReactNode } from "react";
import { RegistrationPaginateResponse } from "~/data/models/registration";
import useDeleteRegistration from "../registration/useDeleteRegistration";

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
  deleteRegistration: jest.fn(),
}));

describe("useDeleteRegistration tests", () => {
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

  const mockInitialData: RegistrationPaginateResponse = {
    data: [
      {
        id: "123",
        employeeName: "Test User",
        email: "test@test.com",
        admissionDate: "2023-01-01",
        status: "APPROVED",
        cpf: "12345678901",
      },
    ],
    total: 1,
    currentPage: 1,
    totalPages: 1,
  };

  it("should update cache and show success message on successful deletion", async () => {
    const mockId = "123";
    (deleteRegistration as jest.Mock).mockResolvedValueOnce(undefined);

    queryClient.setQueryData(["registrations"], mockInitialData);

    const { result } = renderHook(() => useDeleteRegistration(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockId);
    });
    const updatedData = queryClient.getQueryData<RegistrationPaginateResponse>([
      "registrations",
    ]);
    expect(updatedData?.data).toHaveLength(0);
    expect(updatedData?.total).toBe(0);

    expect(deleteRegistration).toHaveBeenCalledWith(mockId);
    expect(toast.success).toHaveBeenCalledWith(
      "Registro deletado com sucesso!"
    );
  });

  it("should handle error and revert cache when deletion fails", async () => {
    const mockId = "123";
    const error = new Error("Erro Teste");
    (deleteRegistration as jest.Mock).mockRejectedValueOnce(error);
    queryClient.setQueryData(["registrations"], mockInitialData);

    const { result } = renderHook(() => useDeleteRegistration(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(mockId);
      } catch (e) {
        expect(e).toBe(error);
      }
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Erro ao excluir registro: Erro Teste"
    );
    expect(queryClient.getQueryState(["registrations"])?.isInvalidated).toBe(
      true
    );
  });

  it("should handle empty cache gracefully", async () => {
    const mockId = "123";
    (deleteRegistration as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useDeleteRegistration(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockId);
    });

    expect(deleteRegistration).toHaveBeenCalledWith(mockId);
    expect(toast.success).toHaveBeenCalledWith(
      "Registro deletado com sucesso!"
    );
  });
});
