import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import useCreateRegistration from "./useCreateRegistration";
import { createRegistration } from "~/data/services/registration/registration-service";
import { ReactNode } from "react";

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
  createRegistration: jest.fn(),
}));

describe("useCreateRegistration tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockRegistrationData = {
    email: "test@test.com",
    employeeName: "Jhony Brabo",
    admissionDate: "2024-11-20",
    cpf: "12345678900",
    status: "REVIEW",
  };

  const mockNewRegistration = {
    ...mockRegistrationData,
    id: "1",
  };

  it("should create a registration successfully", async () => {
    (createRegistration as jest.Mock).mockResolvedValueOnce(
      mockNewRegistration
    );
    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateRegistration(), { wrapper });

    await result.current.mutateAsync(mockRegistrationData);

    expect(createRegistration).toHaveBeenCalledWith(mockRegistrationData);
    expect(toast.success).toHaveBeenCalledWith("Registro criado com sucesso!");
    expect(invalidateQueriesSpy).toHaveBeenCalledWith(["registrations"]);
  });

  it("should handle errors during registration creation", async () => {
    const error = new Error("Erro Teste");
    (createRegistration as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCreateRegistration(), { wrapper });

    try {
      await result.current.mutateAsync(mockRegistrationData);
    } catch (e) {
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao criar registro: Erro Teste"
      );
    }
  });
});
