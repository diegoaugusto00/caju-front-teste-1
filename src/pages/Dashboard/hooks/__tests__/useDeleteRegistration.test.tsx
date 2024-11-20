import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import { deleteRegistration } from "~/data/services/registration/registration-service";
import { ReactNode } from "react";
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
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should delete register with success", async () => {
    const mockId = "123";
    (deleteRegistration as jest.Mock).mockResolvedValueOnce(undefined);
    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteRegistration(), { wrapper });

    await result.current.mutateAsync(mockId);

    expect(deleteRegistration).toHaveBeenCalledWith(mockId);
    expect(toast.success).toHaveBeenCalledWith(
      "Registro deletado com sucesso!"
    );
    expect(invalidateQueriesSpy).toHaveBeenCalledWith(["registrations"]);
  });

  it("should handle error when delete register", async () => {
    const mockId = "123";
    const error = new Error("Erro Teste");
    (deleteRegistration as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDeleteRegistration(), { wrapper });

    try {
      await result.current.mutateAsync(mockId);
    } catch (e) {
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao excluir registro: Erro Teste"
      );
    }
  });
});
