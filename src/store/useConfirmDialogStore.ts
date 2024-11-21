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
  isLoading: boolean;
  setOpenConfirmDialog: (
    title: string,
    description: string,
    callbacks: DialogCallbacks
  ) => void;
  setLoading: (loading: boolean) => void;
  setCloseConfirmDialog: () => void;
}

export const useConfirmDialogStore = create<useConfirmDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  callbacks: {},
  isLoading: false,
  setOpenConfirmDialog: (title, description, callbacks) =>
    set({ open: true, title, description, callbacks }),
  setLoading: (loading) => set({ isLoading: loading }),
  setCloseConfirmDialog: () => {
    set({
      open: false,
      title: "",
      description: "",
      callbacks: {},
      isLoading: false,
    });
  },
}));
