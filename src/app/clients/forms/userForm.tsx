"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { postUser, putUser } from "@/app/api/actions/users";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user: User | null;
  visible: boolean;
  onHide: () => void;
  onSave: (updatedUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user = null,
  visible = false,
  onHide,
  onSave,
}) => {
  const router = useRouter();

  const featchUser = async (FormData: any) => {
    let response;
    user?.id
      ? (response = await putUser(user?.id, FormData.formData))
      : (response = await postUser(FormData.formData));
    router.refresh();
    return response;
  };

  return (
    <Dialog header="Edit User" visible={visible} onHide={onHide}>
      <form action={featchUser}>
        <input type="text" name="usuario" />
        <input type="text" name="sector" value={user?.sector} />
        <input type="text" name="estado" value={user?.estado} />
        <button type="submit">Update User Name</button>
      </form>
    </Dialog>
  );
};

export default UserForm;
