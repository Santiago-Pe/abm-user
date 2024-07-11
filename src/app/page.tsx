import { getUsers } from "@/lib/userServices";
import { Suspense } from "react";
import { lazy } from "react";
import FullScreenLoader from "./loading";
import { UserForm } from "./clients/components";
import { Header } from "./server/components";
export default async function Home() {
  const rows = 5;
  const { users: paginatedUsers, totalRecords } = await getUsers(rows, 1, true);

  const UserLIstLazy = lazy(
    () => import("./clients/components/sections/userList/userList")
  );
  return (
    <div className="w100">
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
