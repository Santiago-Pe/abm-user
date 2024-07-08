import React, { useState, ChangeEvent, FormEvent } from "react";
import { User } from "@/app/types/user";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface UserFormProps {
  user: User | null;
  visible: boolean;
  onHide: () => void;
  onSave: (updatedUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  visible,
  onHide,
  onSave,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  const statusOptions = ["ACTIVO", "INACTIVO"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) =>
      prevUser ? { ...prevUser, [name]: value } : null
    );
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) =>
      prevUser ? { ...prevUser, [name]: value } : null
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedUser) {
      onSave(editedUser);
    }
  };

  return (
    <Dialog header="Edit User" visible={visible} onHide={onHide}>
      {editedUser && (
        <form onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="id">ID</label>
            <InputText
              id="id"
              name="id"
              value={editedUser.id}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="p-field">
            <label htmlFor="usuario">Usuario</label>
            <InputText
              id="usuario"
              name="usuario"
              value={editedUser.usuario}
              onChange={handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="estado">Estado</label>
            <Dropdown
              id="estado"
              name="estado"
              value={editedUser.estado}
              options={statusOptions}
              onChange={handleDropdownChange}
              placeholder="Select status"
            />
          </div>
          <div className="p-field">
            <label htmlFor="sector">Sector</label>
            <InputText
              id="sector"
              name="sector"
              value={editedUser.sector}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" label="Save" className="p-button-success" />
        </form>
      )}
    </Dialog>
  );
};

export default UserForm;
