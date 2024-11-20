import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import { updateRegistrationStatus } from "~/data/services/registration/registration-service";
import { ReactNode } from "react";
import type { Registration } from "~/data/models/registration";
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
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  //TODO - deixar o wrapper em um arquivo separado
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

  it("should update status with success", async () => {
    const newStatus = "APPROVED";
    (updateRegistrationStatus as jest.Mock).mockResolvedValueOnce(undefined);
    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateRegistrationStatus(), {
      wrapper,
    });

    await result.current.mutateAsync({
      registration: mockRegistration,
      newStatus,
    });

    expect(updateRegistrationStatus).toHaveBeenCalledWith(
      mockRegistration,
      newStatus
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Status atualizado com sucesso!"
    );
    expect(invalidateQueriesSpy).toHaveBeenCalledWith(["registrations"]);
  });

  it("should handle error when update register", async () => {
    const error = new Error("Erro Teste");
    (updateRegistrationStatus as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUpdateRegistrationStatus(), {
      wrapper,
    });

    try {
      await result.current.mutateAsync({
        registration: mockRegistration,
        newStatus: "REVIEW",
      });
    } catch (e) {
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao atualizar status: Erro Teste"
      );
    }
  });
});
