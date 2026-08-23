export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
