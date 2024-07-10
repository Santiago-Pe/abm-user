"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import style from "./userList.module.css";
import { User } from "@/app/types/user";
import { FilterMatchMode } from "primereact/api";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UserForm } from "../../forms";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface UserListProps {
  initialData: User[];
  totalRecords: number;
}

const UserList: React.FC<UserListProps> = ({ initialData, totalRecords }) => {
  // States
  const [users, setUsers] = useState<User[]>(initialData);
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
  const [loading, setLoading] = useState<boolean>(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const loadUsers = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/users?page=${page}&limit=${rows}`);
    const data = await response.json();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers(first / rows + 1);
  }, [first, rows]);

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
    let _filters = { ...filters };
    _filters["estado"].value = value;
    setFilters(_filters);
    setStatusFilterValue(value);
  };
  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setFirst(e.first);
    setRows(e.rows);
  };
  const openDialog = (user: User) => {
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
    setIsDialogVisible(false);
  };

  const header = renderHeader();

  return (
    <>
      <DataTable
        value={users}
        header={header}
        //loading={loading}
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
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />

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
