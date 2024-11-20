import { forwardRef } from "react";
import styled from "styled-components";
import { inputBaseStyle } from "../../atoms/Inputs/styles";
import * as S from "./styles";
import { Label } from "~/components/atoms/Label";
import { handleSimpleMask, MaskType } from "~/utils/inputMask";

const Input = styled.input`
  ${inputBaseStyle};
`;

type FormFieldProps = {
  id: string;
  label?: string;
  error?: string;
  mask?: MaskType;
  maxLength?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, mask, maxLength, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleSimpleMask(event, mask, maxLength);
    };

    return (
      <S.FormFieldWrapper>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} ref={ref} {...props} onChange={handleChange} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.FormFieldWrapper>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
