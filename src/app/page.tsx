import { getUsers } from "@/lib/userServices";
import { UserList } from "./clients/sections";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "./server/components/header/header";
import { UserForm } from "./clients/forms";

export default async function Home() {
  const rows = 5;
  const { users: paginatedUsers, totalRecords } = await getUsers(rows, 1, true);

  return (
    <div className="p-m-4">
      <Suspense fallback={<Loading />}>
        <UserList initialData={paginatedUsers} totalRecords={totalRecords} />
      </Suspense>
    </div>
  );
}
