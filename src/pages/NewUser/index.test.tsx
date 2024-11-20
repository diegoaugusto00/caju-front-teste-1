import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import useCreateRegistration from "./hooks/useCreateRegistration";
import { STATUS } from "../Dashboard/constants";
import NewUserPage from ".";
import { act } from "react";
import { userEvent } from "@testing-library/user-event";
import { useForm } from "react-hook-form";

jest.mock("./hooks/useCreateRegistration");
jest.spyOn({ useForm }, "useForm");

describe("NewUserPage tests", () => {
  const mockHistory = createMemoryHistory();
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateRegistration as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
    });
  });

  const renderComponent = () => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <Router history={mockHistory}>
          <NewUserPage />
        </Router>
      </QueryClientProvider>
    );
  };

  it("should render form", () => {
    renderComponent();

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de admissão")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cadastrar" })
    ).toBeInTheDocument();
  });

  it("should navigate to dashboard when 'Votar' button is pressed", () => {
    renderComponent();
    const backButton = screen.getByLabelText("back");

    fireEvent.click(backButton);

    expect(mockHistory.location.pathname).toBe("/dashboard");
  });

  it("should submit the form with valid data", async () => {
    renderComponent();

    await userEvent.type(screen.getByLabelText("Nome"), "Jhony Brabo");
    await userEvent.type(
      screen.getByLabelText("Email"),
      "jhony.brabo@teste.com"
    );
    await userEvent.type(screen.getByLabelText("CPF"), "60151506027");
    await userEvent.type(
      screen.getByLabelText("Data de admissão"),
      "2024-01-01"
    );

    const submitButton = screen.getByRole("button", { name: "Cadastrar" });
    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: "jhony.brabo@teste.com",
        cpf: "60151506027",
        admissionDate: "2024-01-01",
        status: STATUS.REVIEW,
        employeeName: "Jhony Brabo",
      });
    });

    expect(mockHistory.location.pathname).toBe("/dashboard");
  });

  it("should shows validation erros for fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    const nameFieldError = await screen.findByText(
      "É necessário informar nome e sobrenome"
    );

    const emailFieldError = await screen.findByText(
      "Email deve ter no mínimo 5 caracteres"
    );

    const cpfFieldError = await screen.findByText("CPF deve ter 11 dígitos");
    const admissionDateFieldError = await screen.findByText(
      "Data de admissão obrigatória"
    );

    expect(nameFieldError).toBeInTheDocument();
    expect(emailFieldError).toBeInTheDocument();
    expect(cpfFieldError).toBeInTheDocument();
    expect(cpfFieldError).toBeInTheDocument();
    expect(admissionDateFieldError).toBeInTheDocument();
  });

  it("should disable button while loading", () => {
    (useCreateRegistration as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: true,
    });

    renderComponent();

    expect(screen.getByRole("button", { name: "Cadastrar" })).toBeDisabled();
  });
});
