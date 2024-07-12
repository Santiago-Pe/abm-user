export interface User {
  id: number;
  usuario: string;
  estado: string;
  sector: string;
}
export type UsersResponse = {
  users: User[];
  totalRecords: number;
};