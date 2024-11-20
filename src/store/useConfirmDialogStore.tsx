import { create } from "zustand";

export interface DialogCallbacks {
  onConfirm?: () => void;
  onClose?: () => void;
}

interface useConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  callbacks: DialogCallbacks;
  setOpenConfirmDialog: (
    title: string,
    description: string,
    callbacks: DialogCallbacks
  ) => void;
  setCloseConfirmDialog: () => void;
}

export const useConfirmDialogStore = create<useConfirmDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  callbacks: {},
  setOpenConfirmDialog: (title, description, callbacks) =>
    set({ open: true, title, description, callbacks }),
  setCloseConfirmDialog: () => {
    set({
      open: false,
      title: "",
      description: "",
      callbacks: {},
    });
  },
}));
