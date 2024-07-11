"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormFields } from "../hooks/useForm";
import { useRouter } from "next/navigation";
import { postUser, putUser } from "@/app/api/actions/userActions";
import { ErrorMessage } from "@/app/server/components";

interface UserFormProps {
  user?: User | null;
  clearState?: () => void;
  useButton: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user = null,
  clearState = null,
  useButton = false,
}) => {
  const router = useRouter();

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
  const errorMessage = "This input is required";

  // FUnctions
  const handleDialog = () => {
    let emptyObject = {
      id: "",
      usuario: "",
      estado: "",
      sector: "",
    };

    setIsDialogVisible((prevState) => !prevState);
    clearState?.();
    setValues(emptyObject);
  };
  const validate = (fields: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {
      usuario: null,
      estado: null,
      sector: null,
    };

    if (!fields.usuario) {
      newErrors.usuario = "Usuario is required";
    }
    if (!fields.estado) {
      newErrors.estado = "Estado is required";
    }
    if (!fields.sector) {
      newErrors.sector = "Sector is required";
    }

    setError(newErrors);
    return !newErrors.usuario && !newErrors.estado && !newErrors.sector;
  };

  // Server actions
  const featchUser = async () => {
    let isError = validate(fields);
    console.log("FROM VALIDATE", isError);
    if (isError) {
      console.log("FROM IF", isError);
      return;
    } else {
      let response;

      user?.id
        ? (response = await putUser(user?.id, fields))
        : (response = await postUser(fields));
      handleDialog();
      router.refresh();

      return response;
    }
  };

  useEffect(() => {
    if (user !== null) {
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
          className="p-button-success"
          onClick={handleDialog}
        />
      )}
      <Dialog
        header="Edit User"
        visible={user !== null || isDialogVisible}
        onHide={handleDialog}
      >
        {/* <form onSubmit={handleSubmit}> */}
        <form action={featchUser}>
          <div className="p-field">
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
          <div className="p-field">
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
          <div className="p-field">
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
          <Button type="submit" label="Save" className="p-button-success" />
        </form>
      </Dialog>
    </>
  );
};

export default UserForm;
