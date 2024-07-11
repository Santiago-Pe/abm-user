import { getUser, getUsers } from "@/lib/userServices";
import { UserList } from "./clients/sections";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "./server/components/header/header";
import { UserForm } from "./clients/forms";

export default async function Home() {
  const rows = 5;
  const { users: paginatedUsers, totalRecords } = await getUsers(rows, 1, true);
  // const user = await getUser("vEjXymU");
  return (
    <div className="p-m-4">
      <Suspense fallback={<Loading />}>
        <Header title="Usuarios" endComponent={<UserForm useButton={true} />} />
        <UserList initialData={paginatedUsers} totalRecords={totalRecords} />
      </Suspense>
    </div>
  );
}
