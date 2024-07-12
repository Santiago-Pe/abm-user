import { User } from "@/app/types/user";

export interface UserDeleteFormProps {
  user: User | null;
  clearState: () => void;
  isVisible: boolean;
  refetch?: () => void;
}
