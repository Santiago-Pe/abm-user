import { getUsers } from "@/lib/userServices";
import { Suspense } from "react";
import Header from "./server/components/header/header";
import { UserForm } from "./clients/forms";
import FullScreenLoader from "./loading";
import { lazy } from "react";
export default async function Home() {
  const rows = 5;
  const { users: paginatedUsers, totalRecords } = await getUsers(rows, 1, true);
  // const user = await getUser("vEjXymU");
  const UserLIstLazy = lazy(
    () => import("./clients/sections/userList/userList")
  );
  return (
    <div className="p-m-4 w100">
      <Header title="Usuarios" endComponent={<UserForm useButton={true} />} />
      <Suspense fallback={<FullScreenLoader useOpacity />}>
        <UserLIstLazy
          initialData={paginatedUsers}
          totalRecords={totalRecords}
        />
      </Suspense>
    </div>
  );
}
