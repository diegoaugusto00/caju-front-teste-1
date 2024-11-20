import { render, fireEvent } from "@testing-library/react";
import TextField from ".";
import { cpfMask } from "~/utils/validators";
import { act } from "react";

describe("TextField Component", () => {
  it("should render without crashing", () => {
    const { getByLabelText } = render(<TextField label="CPF" id="cpf" />);
    expect(getByLabelText("CPF")).toBeInTheDocument();
  });

  it("should display the label", () => {
    const { getByLabelText } = render(<TextField label="CPF" id="cpf" />);
    expect(getByLabelText("CPF")).toBeInTheDocument();
  });

  it("should apply the mask correctly", () => {
    const { getByLabelText } = render(
      <TextField label="CPF" id="cpf" mask={cpfMask} />
    );
    const input = getByLabelText("CPF") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12345678901" } });
    expect(input.value).toBe("123.456.789-01");
  });

  it("should limit the input length", () => {
    const { getByLabelText } = render(
      <TextField label="CPF" id="cpf" maxLength={14} />
    );
    const input = getByLabelText("CPF") as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "123456789012345" } });
    });
    expect(input.value.length).toBe(14);
  });

  it("should display error message", () => {
    const { getByText } = render(
      <TextField label="CPF" id="cpf" error="Invalid CPF" />
    );
    expect(getByText("Invalid CPF")).toBeInTheDocument();
  });

  it("should call onChange handler", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <TextField label="CPF" id="cpf" onChange={handleChange} />
    );
    const input = getByLabelText("CPF") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "123" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
