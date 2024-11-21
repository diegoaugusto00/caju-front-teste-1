import styled, { keyframes } from "styled-components";
import Button, { ButtonSmall } from "..";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 0.8s linear infinite;
  margin-right: 8px;
`;

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "default" | "small";
  bgcolor?: string;
  color?: string;
}

const LoadingButton = ({
  loading = false,
  variant = "default",
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  const ButtonComponent = variant === "small" ? ButtonSmall : Button;

  return (
    <ButtonComponent
      {...props}
      disabled={disabled || loading}
      style={{
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading && <LoadingSpinner />}
      {children}
    </ButtonComponent>
  );
};

export default LoadingButton;
