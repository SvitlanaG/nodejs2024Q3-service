export interface User {
  id: string;
  login: string;
  password: string; // not return to client
  version: number;
  createdAt: number;
  updatedAt: number;
}
