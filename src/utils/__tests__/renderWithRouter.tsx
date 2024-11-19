import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

interface WrapperProps {
  children: ReactNode;
}

/**
 * Renderiza um componente React com o contexto do React Router para testes.
 *
 * @param {React.ReactElement} children - O componente filho React a ser renderizado.
 * @param {string} [options.route='/'] - A rota inicial.
 * @returns {Object} O resultado da renderização com o Wrapper e o history.
 */
const renderWithRouter = (
  children: React.ReactElement,
  { route = "/" } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(children, { wrapper: Wrapper }),
    history,
  };
};

export default renderWithRouter;
