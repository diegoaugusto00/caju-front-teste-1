import { render, screen, fireEvent } from "@testing-library/react";

import { useConfirmDialogStore } from "~/store/useConfirmDialogStore";
import ConfirmDialog from ".";

describe("ConfirmDialog", () => {
  beforeEach(() => {
    useConfirmDialogStore.getState().setCloseConfirmDialog();
  });

  it("should not render when open is false", () => {
    render(<ConfirmDialog />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should render dialog with correct title and description", () => {
    useConfirmDialogStore
      .getState()
      .setOpenConfirmDialog("Test Title", "Test Description", {});

    render(<ConfirmDialog />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should call onConfirm when 'Prosseguir' button is pressed", () => {
    const onConfirm = jest.fn();
    useConfirmDialogStore
      .getState()
      .setOpenConfirmDialog("Title", "Description", { onConfirm });

    render(<ConfirmDialog />);

    fireEvent.click(screen.getByText("Prosseguir"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when 'Cancelar' button is pressed", () => {
    const onClose = jest.fn();
    useConfirmDialogStore
      .getState()
      .setOpenConfirmDialog("Title", "Description", { onClose });

    render(<ConfirmDialog />);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should render the buttons", () => {
    useConfirmDialogStore
      .getState()
      .setOpenConfirmDialog("Title", "Description", {});

    render(<ConfirmDialog />);

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Prosseguir")).toBeInTheDocument();
  });
});
