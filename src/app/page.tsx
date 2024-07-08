import { getUsers } from "@/lib/userServices";
import { User } from "./types/user";
import { UserList } from "./clients/sections";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  const initialData: User[] = await getUsers(10, 1); // Obtener los primeros 10 usuarios
  const totalRecords = 120; // Este valor debería venir del servidor

  return (
    <div className="p-m-4">
      <Suspense fallback={<Loading />}>
        <UserList initialData={initialData} totalRecords={totalRecords} />
      </Suspense>
    </div>
  );
}
