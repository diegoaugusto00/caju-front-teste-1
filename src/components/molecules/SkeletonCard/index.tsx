import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%; /* Ocupe toda a largura do elemento pai */
  height: auto; /* Ajuste de altura baseado no conteúdo */
  padding: 36px;
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* Inclui padding e border no tamanho */
`;

const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#f8f8f8">
      <CardContainer data-testid="skeleton-card">
        <Skeleton width="70%" height={20} style={{ marginBottom: 10 }} />
        <Skeleton count={2} style={{ marginBottom: 10 }} />
        <Skeleton width="50%" />
      </CardContainer>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
