"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormFields } from "../hooks/useForm";
import { useRouter } from "next/navigation";
import { postUser, putUser } from "@/app/api/actions/userActions";

interface UserFormProps {
  user?: User | null;
  clearState?: () => void;
  callback?: () => void;
  useButton: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user = null,
  clearState = null,
  useButton = false,
  callback = null,
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

  // Data
  const statusOptions = ["ACTIVO", "INACTIVO"];

  // const getUser = async (page: number) => {
  //   const response = await fetch(
  //     `https://staging.duxsoftware.com.ar/api/personal?sector=2222&_limit=${5}&_page=${page}`
  //   );
  //   const data = await response.json();
  // };
  // const postUser = async (fields: any) => {
  //   try {
  //     const response = await fetch(
  //       `https://staging.duxsoftware.com.ar/api/personal?sector=2222`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(fields),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to post user");
  //     }

  //     const data = await response.json();

  //     handleDialog();

  //     return data;
  //   } catch (error) {
  //     console.error("Error posting user:", error);
  //     throw error;
  //   }
  // };
  // const putUser = async (fields: any) => {
  //   try {
  //     const response = await fetch(
  //       `https://staging.duxsoftware.com.ar/api/personal/${fields.id}?sector=2222`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(fields),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to post user");
  //     }

  //     const data = await response.json();
  //     handleDialog();

  //     return data;
  //   } catch (error) {
  //     console.error("Error posting user:", error);
  //     throw error;
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // build boyd
    if (user) {
      await putUser(fields);
      callback?.();
    } else {
      await postUser(fields);
      await getUser(10);
    }
  };
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

  // Server actions
  const featchUser = async (FormData: any) => {
    let response;
    // if (user?.id) {
    //   console.log("edicion");
    //   response = await putUser(user?.id, fields);
    // } else {
    //   console.log("creacion");
    //   response = await postUser(fields);
    // }
    user?.id
      ? (response = await putUser(user?.id, fields))
      : (response = await postUser(fields));
    handleDialog();
    router.refresh();

    return response;
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

  console.log("render");

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
            />
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
            />
          </div>
          <div className="p-field">
            <label htmlFor="sector">Sector</label>
            <InputText
              id="sector"
              name="sector"
              value={fields.sector}
              onChange={handleFieldChange}
            />
          </div>
          <Button type="submit" label="Save" className="p-button-success" />
        </form>
      </Dialog>
    </>
  );
};

export default UserForm;
