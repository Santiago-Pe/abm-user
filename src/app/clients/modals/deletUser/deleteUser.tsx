"use client";
import React, { useRef, useCallback } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { removeUser } from "@/app/api/actions/userActions";
import { Toast } from "primereact/toast";
import { SubmitButton } from "../../forms/submitButton";

interface UserDeleteFormProps {
  user: User | null;
  clearState: () => void;
  isVisible: boolean;
  refetch?: () => void;
}

const UserDeleteForm: React.FC<UserDeleteFormProps> = ({
  user,
  clearState,
  isVisible = false,
  refetch = null,
}) => {
  const toast = useRef<Toast>(null);

  const showDeleteSuccess = useCallback(() => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Usuario eliminado con éxito",
      life: 3000,
    });
  }, []);
  const handleDeleteUser = useCallback(async () => {
    if (!user) return;

    try {
      await removeUser(user.id);
      showDeleteSuccess();
      clearState();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al eliminar el usuario",
        life: 3000,
      });
    }
  }, [user, clearState, showDeleteSuccess]);
  const handleCancel = useCallback(() => {
    clearState();
  }, [clearState]);
  const callback = () => {
    refetch?.();
  };
  return (
    <>
      <Toast ref={toast} onHide={callback} />
      <Dialog
        header={`Eliminar Usuario: ${user?.usuario}`}
        visible={isVisible && user !== null}
        onHide={handleCancel}
        footer={
          <form action={handleDeleteUser}>
            <Button
              label="No"
              className="p-button-text"
              onClick={handleCancel}
            />
            <SubmitButton label="Si" />
          </form>
        }
      >
        <p>¿Estás seguro que quieres eliminar este usuario?</p>
      </Dialog>
    </>
  );
};

export default UserDeleteForm;
