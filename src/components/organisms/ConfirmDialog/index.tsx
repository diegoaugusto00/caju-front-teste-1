import styled from "styled-components";
import { ButtonSmall } from "~/components/atoms/Buttons";
import { useConfirmDialogStore } from "~/store/useConfirmDialogStore";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

const DialogMessage = styled.p`
  margin: 0;
  margin-bottom: 20px;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ConfirmDialog = () => {
  const {
    open,
    title,
    description,
    callbacks: { onConfirm, onClose },
  } = useConfirmDialogStore();

  if (!open) return null;

  return (
    <DialogOverlay>
      <DialogContainer>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{description}</DialogMessage>
        <DialogActions>
          <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={onClose}>
            Cancelar
          </ButtonSmall>
          <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={onConfirm}>
            Prosseguir
          </ButtonSmall>
        </DialogActions>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default ConfirmDialog;
