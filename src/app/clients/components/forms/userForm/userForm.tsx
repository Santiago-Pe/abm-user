"use client";
import React, { useEffect, useRef, useState } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { postUser, putUser } from "@/app/api/actions/userActions";
import { ErrorMessage } from "@/app/server/components";
import { Toast } from "primereact/toast";
import { z } from "zod";
import { useFormFields } from "../../../hooks";
import SubmitButton from "../submitButton/submitButton";

interface UserFormProps {
  user?: User | null;
  clearState?: () => void;
  useButton: boolean;
  isVisible?: boolean;

  refetch?: () => void;
}
const userSchema = z.object({
  usuario: z.string().min(1, "Usuario is required"),
  estado: z.string().min(1, "Estado is required"),
  sector: z
    .union([
      z.string().min(1, "Sector is required"),
      z.number().min(1, "Sector is required"),
    ])
    .refine((val) => {
      if (typeof val === "string") return val.trim() !== "";
      return true;
    }, "Sector is required"),
});

type ValidationError = {
  [K in keyof z.infer<typeof userSchema>]?: string[];
};

const UserForm: React.FC<UserFormProps> = ({
  user = null,
  clearState = null,
  useButton = false,
  isVisible = false,
  refetch = null,
}) => {
  const router = useRouter();
  const toast = useRef(null);

  // Custom Hook and States
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [fields, handleFieldChange, setValues] = useFormFields({
    id: user?.id?.toString() || "",
    usuario: user?.usuario || "",
    estado: user?.estado || "",
    sector: user?.sector || "",
  });
  const [error, setError] = useState<ValidationErrors>({
    usuario: null,
    estado: null,
    sector: null,
  });

  // Data
  const statusOptions = ["ACTIVO", "INACTIVO"];

  // Server actions
  const featchUser = async () => {
    const result = userSchema.safeParse(fields);

    if (!result.success) {
      setError((prevState) => {
        const newState = { ...prevState };
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof ValidationErrors;
          if (fieldName in newState) {
            newState[fieldName] = issue.message;
          }
        });
        return newState;
      });
      return {
        success: false,
        errors: result.error.flatten().fieldErrors as ValidationError,
      };
    } else {
      setError({
        usuario: null,
        estado: null,
        sector: null,
      });
    }

    let response;

    try {
      if (user?.id) {
        response = await putUser(user.id, fields);
        showEditSuccess();
      } else {
        response = await postUser(fields);
        showCreateSuccess();
      }
      handleDialog();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
    }

    return { succes: true };
  };

  // Functions
  const showCreateSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Se creo con exito el usuario",
      life: 3000,
    });
  };
  const showEditSuccess = () => {
    toast?.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Se edito con exito el usuairo",
      life: 3000,
    });
  };
  const isUserVisible = (user: User | null, isVisible: boolean): boolean => {
    return user !== null && isVisible;
  };
  const shouldShowDialog = (
    user: User | null,
    isVisible: boolean,
    isDialogVisible: boolean
  ): boolean => {
    return isUserVisible(user, isVisible) || isDialogVisible;
  };
  const callback = () => {
    refetch ? refetch() : router.refresh();
  };
  const handleDialog = () => {
    let emptyObject = {
      id: "",
      usuario: "",
      estado: "",
      sector: "",
    };

    setIsDialogVisible((prevState) => !prevState);
    setValues(emptyObject);
    setError({
      usuario: null,
      estado: null,
      sector: null,
    });
    clearState?.();
  };

  const visible = shouldShowDialog(user, isVisible, isDialogVisible);

  useEffect(() => {
    if (user !== null && isVisible) {
      setIsDialogVisible(true);
      setValues({
        id: user.id.toString(),
        usuario: user.usuario,
        estado: user.estado,
        sector: user.sector,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {useButton && (
        <Button
          type="button"
          label="Create user"
          className="bg-primary"
          onClick={handleDialog}
        />
      )}
      <Toast ref={toast} onRemove={callback} />
      <Dialog
        header={"Usuario"}
        visible={visible}
        onHide={handleDialog}
        style={{ width: "50rem" }}
      >
        <form action={featchUser}>
          <div className="containerInput">
            <label htmlFor="usuario">Usuario</label>
            <InputText
              id="usuario"
              name="usuario"
              value={fields.usuario}
              onChange={handleFieldChange}
              invalid={error.usuario !== null}
            />
            {error.usuario != null && <ErrorMessage text={error.usuario} />}
          </div>
          <div className="containerInput">
            <label htmlFor="estado">Estado</label>
            <Dropdown
              id="estado"
              name="estado"
              value={fields.estado}
              options={statusOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(e) =>
                handleFieldChange({ target: { id: "estado", value: e.value } })
              }
              placeholder="Select status"
              invalid={error.estado !== null}
            />
            {error.estado != null && <ErrorMessage text={error.estado} />}
          </div>
          <div className="containerInput">
            <label htmlFor="sector">Sector</label>
            <InputText
              id="sector"
              name="sector"
              value={fields.sector}
              onChange={handleFieldChange}
              invalid={error.sector !== null}
            />
            {error.sector != null && <ErrorMessage text={error.sector} />}
          </div>
          <div className="containerButton mt-3">
            <SubmitButton label="Confirmar" icon="pi pi-check" />
            <Button label="Salir" outlined icon="pi pi-times" />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default UserForm;
