import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { inputBaseStyle } from "../styles";
import { handleSimpleMask, MaskType } from "~/utils/inputMask";

const Input = styled.input`
  ${inputBaseStyle};
`;

type TextFieldProps = {
  label?: string;
  error?: string;
  id?: string;
  value?: string;
  maxLength?: number;
  mask?: MaskType;
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
    handleSimpleMask(event, mask, maxLength);

    if (onChange) {
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
