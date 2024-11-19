import styled from "styled-components";

export const _IconButtonStyled = styled.button`
  cursor: pointer;
  border: 2px solid #64a98c;
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: #64a98c;
  }
`;

export const _IconButtonNoStyle = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 16px;
    height: 16px;
  }
`;

type IconButtonProps = {
  children?: React.ReactNode;
  noStyle?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ noStyle, ...props }: IconButtonProps) => {
  const ButtonComponent = noStyle ? _IconButtonNoStyle : _IconButtonStyled;
  return <ButtonComponent {...props}>{props.children}</ButtonComponent>;
};
