// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

import { getUsers } from "@/lib/userServices";
import { User } from "./types/user";
import { UserList } from "./clients/sections";
import { Table } from "./server/components";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  const users: User[] = await getUsers(11, 1);

  return (
    <div className="p-m-4">
      <Suspense fallback={<Loading />}>
        <UserList users={users}>
          <Table />
        </UserList>
      </Suspense>
    </div>
  );
}
