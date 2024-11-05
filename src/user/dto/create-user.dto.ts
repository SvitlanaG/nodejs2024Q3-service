export class CreateUserDto {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
