import { UserRole } from "@prisma/client";
import { Request } from "express";

export interface RequestType<T = {}> extends Request {
  body: T;
  user: {
    id: string;
    role: UserRole;
  };
}
