import styled from "styled-components";

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  button {
    flex: 0;
  }

  svg {
    cursor: pointer;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    gap: 4px; 

    button {
      padding: 4px 8px; 
      font-size: 12px; 
    }

    svg {
      margin-left: 16px;
    }
  }
`;
