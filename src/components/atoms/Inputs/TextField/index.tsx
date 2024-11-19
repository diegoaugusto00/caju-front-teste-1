import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { inputBaseStyle } from "../styles";

const Input = styled.input`
  ${inputBaseStyle};
`;

type TextFieldProps = {
  label?: string;
  error?: string;
  id?: string;
  value?: string;
  maxLength?: number;
  mask?: (value: string) => string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  id,
  value,
  maxLength,
  mask,
  onChange,
  ...props
}: TextFieldProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (mask) {
      event.currentTarget.value = mask(value);
    }

    if (maxLength && value.length > maxLength) {
      event.currentTarget.value = value.slice(0, maxLength);
    }

    if (typeof onChange === "function") {
      onChange(event);
    }
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};

export default TextField;
