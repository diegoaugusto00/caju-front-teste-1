import { screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from ".";
import routes from "~/router/routes";
import renderWithRouter from "~/utils/__tests__/renderWithRouter";
import { STATUS } from "../../constants";

describe("SearchBar Component tests", () => {
  it("should render without crashing", () => {
    const { container } = renderWithRouter(<SearchBar />);
    expect(container).toBeInTheDocument();
  });

  it("should call onSearch with correct values when typing in the CPF fiels", async () => {
    const mockOnSearch = jest.fn();
    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);

    const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");
    fireEvent.change(cpfInput, { target: { value: "123.456.789-01" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("12345678901", "");
    });
  });

  it("should call onSearch with values when selecting a status", async () => {
    const mockOnSearch = jest.fn();
    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);

    const statusSelect = screen.getByRole("combobox");
    fireEvent.change(statusSelect, { target: { value: STATUS.APPROVED } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("", STATUS.APPROVED);
    });
  });

  it("should clear the search fields when clicking the refresh button", () => {
    renderWithRouter(<SearchBar />);

    const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");
    const statusSelect = screen.getByRole("combobox");
    const refreshButton = screen.getByLabelText("refetch");

    fireEvent.change(cpfInput, { target: { value: "123.456.789-01" } });
    fireEvent.change(statusSelect, { target: { value: STATUS.APPROVED } });
    fireEvent.click(refreshButton);

    expect(cpfInput).toHaveValue("");
    expect(statusSelect).toHaveValue("");
  });

  it("should call onSearch with cpf and status", async () => {
    const mockOnSearch = jest.fn();

    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);

    const cpfInput = screen.getByPlaceholderText("Digite um CPF válido");
    const statusSelect = screen.getByRole("combobox");

    fireEvent.change(cpfInput, { target: { value: "123.456.789-01" } });
    fireEvent.change(statusSelect, { target: { value: STATUS.APPROVED } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("12345678901", STATUS.APPROVED);
    });
  });

  it("should navigate to new admission page when click in the new admission button", () => {
    const { history } = renderWithRouter(<SearchBar />);

    const newAdmissionButton = screen.getByText("Nova Admissão");
    fireEvent.click(newAdmissionButton);

    expect(history.location.pathname).toBe(routes.newUser);
  });
});
