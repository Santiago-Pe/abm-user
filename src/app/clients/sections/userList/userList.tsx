"use client";
import React, { useState, ChangeEvent, useCallback } from "react";
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
import Header from "@/app/server/components/header/header";

interface UserListProps {
  initialData: User[];
  totalRecords: number;
}

const UserList: React.FC<UserListProps> = ({
  initialData = [],
  totalRecords,
}) => {
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
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(5);

  // Data
  const statusOptions = ["ACTIVO", "INACTIVO"];
  const columns = [
    { field: "id", header: "ID" },
    { field: "usuario", header: "Usuario" },
    { field: "estado", header: "Estado" },
    { field: "sector", header: "Sector" },
  ];

  // Functions
  const loadUsers = async (page: number) => {
    const response = await fetch(
      `https://staging.duxsoftware.com.ar/api/personal?sector=2222&_limit=${rows}&_page=${page}`
    );
    const data = await response.json();
    setUsers(data);
  };
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
          className={style.buttonSmall}
          label="Re"
          onClick={() => loadUsers(1)}
        />
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
    loadUsers(e.first / e.rows + 1);
  };
  const openDialog = (user: User) => {
    setSelectedUser(user);
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
  const clearState = useCallback(() => {
    setSelectedUser(null);
  }, []);
  const handleRefetch = async () => {
    await loadUsers(first / rows + 1);
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
        globalFilterFields={["usuario", "estado"]}
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
        onPageChange={onPageChange}
      />

      <UserForm user={selectedUser} clearState={clearState} useButton={false} />
    </>
  );
};

export default UserList;
