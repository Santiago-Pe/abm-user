import { User } from "@/app/types/user";

interface UseFetchUsersResult {
  users: User[] | null;
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number) => Promise<void>;
}

export default UseFetchUsersResult