import { DialogCallbacks } from "~/store/useConfirmDialogStore";

export type DialogAction = "APPROVE" | "REJECT" | "REVIEW" | "DELETE";

type DialogConfig = {
  [Key in DialogAction]: {
    title: string;
    description: string;
  };
};

export const createDialogHandler =
  (
    handleAction: (action: DialogAction) => void,
    setOpenConfirmDialog: (
      title: string,
      description: string,
      callbacks: DialogCallbacks
    ) => void,
    setCloseConfirmDialog: () => void
  ) =>
  (action: DialogAction, employeeName: string) =>
  () => {
    const dialogConfig: DialogConfig = {
      APPROVE: {
        title: "Aprovar Registro",
        description: `Deseja aprovar o registro de ${employeeName}?`,
      },
      REJECT: {
        title: "Reprovar Registro",
        description: `Deseja reprovar o registro de ${employeeName}?`,
      },
      REVIEW: {
        title: "Revisar Registro",
        description: `Deseja revisar o registro de ${employeeName}?`,
      },
      DELETE: {
        title: "Excluir Registro",
        description: `Deseja excluir o registro de ${employeeName}?`,
      },
    };

    setOpenConfirmDialog(
      dialogConfig[action].title,
      dialogConfig[action].description,
      {
        onConfirm: () => handleAction(action),
        onClose: () => setCloseConfirmDialog(),
      }
    );
  };
