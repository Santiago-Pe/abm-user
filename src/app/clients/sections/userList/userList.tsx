"use client";
import React, { useState, ChangeEvent, useCallback, useRef } from "react";
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
import { UserDeleteForm } from "../../modals";
import useFetchUsers from "../../hooks/useFetchUsers";

interface UserListProps {
  initialData: User[];
  totalRecords: number;
}

const UserList: React.FC<UserListProps> = ({
  initialData = [],
  totalRecords,
}) => {
  // States
  const { users, loading, error, fetchUsers } = useFetchUsers(initialData);
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
  const ref = useRef("");

  // Data
  const statusOptions = ["ACTIVO", "INACTIVO"];
  const columns = [
    { field: "id", header: "ID" },
    { field: "usuario", header: "Usuario" },
    { field: "estado", header: "Estado" },
    { field: "sector", header: "Sector" },
    { field: undefined, header: "Accion" },
  ];

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
        <div className="contanierIconInput" style={{ width: "100%" }}>
          <i className="pi pi-search iconInput" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className={style.w100}
          />
        </div>
        <Button
          icon="pi pi-filter-fill"
          className={`${style.buttonSmall} bg-gray `}
          disabled
        />
        <Button
          icon="pi pi-sliders-v"
          className={`${style.buttonSmall} bg-gray `}
          disabled
        />
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
    fetchUsers(e.first / e.rows + 1);
  };
  const openDialog = (user: User, dialog: string) => {
    ref.current = dialog;
    setSelectedUser(user);
  };
  const nameTemplate = (rowData: User) => {
    return (
      <Button
        type="button"
        onClick={() => openDialog(rowData, "USER_FORM")}
        label={rowData.usuario}
        link
      />
    );
  };
  const actionTemplate = (rowData: User) => {
    return (
      <Button
        severity="danger"
        onClick={() => openDialog(rowData, "USER_DELETE_FORM")}
        icon={"pi pi-times-circle"}
      />
    );
  };
  const renderTemplate = (header: string | undefined) => {
    switch (header) {
      case "Usuario":
        return nameTemplate;
      case "Accion":
        return actionTemplate;
      default:
        return undefined;
    }
  };
  const clearState = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const refetch = () => {
    fetchUsers(first / rows + 1);
  };

  const header = renderHeader();

  return (
    <>
      <DataTable
        value={users ?? []}
        header={header}
        size="normal"
        //loading={loading}
        filters={filters}
        globalFilterFields={["usuario", "estado"]}
        filterDisplay="menu"
        className="w100"
      >
        {columns.map((col, idx) => (
          <Column
            key={idx}
            field={col?.field}
            header={col?.header}
            sortable={typeof col?.field === "string"}
            body={renderTemplate(col?.header)}
          />
        ))}
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
      />

      <UserForm
        user={selectedUser}
        clearState={clearState}
        useButton={false}
        isVisible={ref.current === "USER_FORM"}
        refetch={refetch}
      />
      <UserDeleteForm
        user={selectedUser}
        clearState={clearState}
        isVisible={ref.current === "USER_DELETE_FORM"}
        refetch={refetch}
      />
    </>
  );
};

export default UserList;
