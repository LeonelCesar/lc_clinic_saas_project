import type { BaseEntity } from "../core/entity.types";

export type UserRole =
  | "ADMIN"
  | "DOCTOR"
  | "PATIENT";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED";

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
}

export type PublicUser = Omit<User, "password">;