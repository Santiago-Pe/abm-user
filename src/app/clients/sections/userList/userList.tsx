"use client";
import React, { useState, ChangeEvent } from "react";
import style from "./userList.module.css";
import { User } from "@/app/types/user";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import Link from "next/link";
import { text } from "stream/consumers";
import { UserForm } from "../../forms";

interface UserListProps {
  //children: React.ReactElement<any>;
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  // States
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [statusFilterValue, setStatusFilterValue] = useState<string | null>(
    null
  );
  const [filters, setFilters] = useState({
    global: {
      value: null as string | null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    estado: { value: null as string | null, matchMode: FilterMatchMode.EQUALS },
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  // Data
  const statusOptions = ["ACTIVO", "INACTIVO"];
  const columns = [
    { field: "id", header: "ID" },
    { field: "usuario", header: "Usuario" },
    { field: "estado", header: "Estado" },
    { field: "sector", header: "Sector" },
  ];

  // Functions
  const renderHeader = () => {
    return (
      <div className={style.containerHeader}>
        <Dropdown
          value={statusFilterValue}
          options={statusOptions}
          onChange={onStatusFilterChange}
          placeholder="Seleccionar estado"
          className={style.w100}
          showClear
        />
        <div className="p-input-icon-left" style={{ width: "100%" }}>
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className={style.w100}
          />
        </div>
        <Button
          icon="pi pi-filter-fill"
          className={style.buttonSmall}
          disabled
        />
        <Button icon="pi pi-sliders-v" className={style.buttonSmall} disabled />
      </div>
    );
  };
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters.global.value = value as string | null;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const onStatusFilterChange = (e: DropdownChangeEvent) => {
    const value = e.value;
    console.log(value);
    let _filters = { ...filters };
    _filters["estado"].value = value;
    setFilters(_filters);
    setStatusFilterValue(value);
  };
  const openDialog = (user: User) => {
    console.log("click");
    setSelectedUser(user);
    setIsDialogVisible(true);
  };
  const nameTemplate = (rowData: User) => {
    return (
      <Button
        type="button"
        onClick={() => openDialog(rowData)}
        label={rowData.usuario}
        link
      />
    );
  };
  const handleSave = (updatedUser: User) => {
    // Aquí podrías actualizar la lista de usuarios con el usuario editado
    // por simplicidad solo se muestra el console.log
    console.log("Usuario actualizado:", updatedUser);
    setIsDialogVisible(false);
  };

  const header = renderHeader();

  return (
    <>
      <DataTable
        value={users}
        paginator
        rows={5}
        header={header}
        size="normal"
        filters={filters}
        globalFilterFields={["name", "status"]}
        filterDisplay="menu"
        className="w100"
      >
        {columns.map((col, idx) => (
          <Column
            key={idx}
            field={col.field}
            header={col.header}
            sortable
            body={col.field === "usuario" ? nameTemplate : undefined}
          />
        ))}
      </DataTable>

      <UserForm
        user={selectedUser}
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default UserList;
