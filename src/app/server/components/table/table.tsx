import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { User } from "@/app/types/user";

interface TableProps {
  data?: User[];
  header?: React.ReactNode;
  filters?: any;
  columns?: { field: string; header: string }[] | undefined;
  globalFilterField?: [];
}

const Table: React.FC<TableProps> = ({
  data,
  header,
  filters,
  columns,
  globalFilterField,
}) => {
  return (
    <DataTable
      value={data}
      paginator
      rows={5}
      header={header}
      size="normal"
      filters={filters}
      filterDisplay="menu"
      globalFilterFields={globalFilterField}
      className="w100"
    >
      {columns?.map((col, idx) => (
        <Column
          key={idx}
          field={col.field}
          header={col.header}
          sortable
          filter
        />
      ))}
    </DataTable>
  );
};

export default Table;
