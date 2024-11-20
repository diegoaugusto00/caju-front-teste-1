import { useConfirmDialogStore } from "./useConfirmDialogStore";

describe("useConfirmDialogStore tests", () => {
  beforeEach(() => {
    useConfirmDialogStore.getState().setCloseConfirmDialog();
  });

  it("should initialize with the default state", () => {
    const state = useConfirmDialogStore.getState();
    expect(state.open).toBe(false);
    expect(state.title).toBe("");
    expect(state.description).toBe("");
    expect(state.callbacks).toEqual({});
  });

  it("should open the dialog with the correct values", () => {
    const callbacks = {
      onConfirm: jest.fn(),
      onClose: jest.fn(),
    };

    useConfirmDialogStore
      .getState()
      .setOpenConfirmDialog("Test Title", "Test Description", callbacks);

    const state = useConfirmDialogStore.getState();
    expect(state.open).toBe(true);
    expect(state.title).toBe("Test Title");
    expect(state.description).toBe("Test Description");
    expect(state.callbacks).toEqual(callbacks);
  });

  it("should close the dialog and reset the values", () => {
    const callbacks = {
      onConfirm: jest.fn(),
      onClose: jest.fn(),
    };

    const store = useConfirmDialogStore.getState();
    store.setOpenConfirmDialog("Title", "Description", callbacks);
    store.setCloseConfirmDialog();

    const state = useConfirmDialogStore.getState();
    expect(state.open).toBe(false);
    expect(state.title).toBe("");
    expect(state.description).toBe("");
    expect(state.callbacks).toEqual({});
  });
});
