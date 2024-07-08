import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Loading() {
  const items: number[] = Array.from({ length: 5 }, (v, i) => i);

  return (
    <DataTable value={items} className="w100">
      <Column
        field="code"
        header="Code"
        style={{ width: "25%" }}
        body={<Skeleton />}
      ></Column>
      <Column
        field="name"
        header="Name"
        style={{ width: "25%" }}
        body={<Skeleton />}
      ></Column>
      <Column
        field="category"
        header="Category"
        style={{ width: "25%" }}
        body={<Skeleton />}
      ></Column>
      <Column
        field="quantity"
        header="Quantity"
        style={{ width: "25%" }}
        body={<Skeleton />}
      ></Column>
    </DataTable>
  );
}
