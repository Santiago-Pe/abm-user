"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormState, useFormStatus } from "react-dom";
import { addUser } from "@/app/api/actions/users";
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
  const { data } = useFormStatus();

  // const addUserFunc = addUser.bind(data, user?.id);

  return (
    <Dialog header="Edit User" visible={visible} onHide={onHide}>
      <form
        action={async (FormData) => {
          await addUser(FormData, user?.id);
          router.refresh();
        }}
      >
        <input type="text" name="name" />
        <input type="text" name="lastname" />
        <button type="submit">Update User Name</button>
      </form>
    </Dialog>
  );
};

export default UserForm;
