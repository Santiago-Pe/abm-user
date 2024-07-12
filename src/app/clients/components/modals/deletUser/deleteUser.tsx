"use client";
import React, { useRef, useCallback } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { removeUser } from "@/app/api/actions/userActions";
import { Toast } from "primereact/toast";
import { UserDeleteFormProps } from "./deleteUsers.types";
import { SubmitButton } from "../../forms";

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
  const header = () => {
    return (
      <>
        <div>
          Eliminar usuario:{" "}
          <span className="capitalize-text">
            {user?.usuario.toLocaleLowerCase()}
          </span>
        </div>
      </>
    );
  };
  return (
    <>
      <Toast ref={toast} onHide={callback} />
      <Dialog
        header={header}
        visible={isVisible && user !== null}
        onHide={handleCancel}
        style={{ width: "30rem" }}
        footer={
          <form action={handleDeleteUser}>
            <div className="containerButton">
              <SubmitButton label="Si" icon="pi pi-check" />
              <Button label="No" outlined icon="pi pi-times" />
            </div>
          </form>
        }
      >
        <p>¿Estás seguro que quieres eliminar este usuario?</p>
      </Dialog>
    </>
  );
};

export default UserDeleteForm;
