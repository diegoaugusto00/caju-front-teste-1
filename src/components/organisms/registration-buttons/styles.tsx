import styled from "styled-components";

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  button {
    flex: 0;
  }

  @media (max-width: 768px) {
    gap: 4px;

    button {
      padding: 4px 8px;
      font-size: 12px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;
