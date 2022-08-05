import { UserRole } from "@prisma/client";

export interface signupType {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface updateUser{
  username: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

