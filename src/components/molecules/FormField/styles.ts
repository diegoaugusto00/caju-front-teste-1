import styled from "styled-components";

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espaçamento entre o label, input e erro */
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;
