import { RequestType } from "./../types";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient, User, UserRole } from "@prisma/client";

const { user } = new PrismaClient();

export const auth = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.SECRETKEY,
    async function (err, payload: JwtPayload & { id: string; role: UserRole }) {
      if (err) {
        res.status(401).send({ message: "nuthorized" });
      }

      if (!payload) {
        return res.status(400).send({ message: "Error" });
      }

      const isUserExist = await user.findFirst({
        where: { id: payload.id, role: payload.role },
      });
      if (!isUserExist) {
        return res.status(401).send({ message: "is not authenticate" });
      }
      req.user = {
        id: payload.id,
        role: payload.role,
      };
      next();
    }
  );
};

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.SECRETKEY, {
    expiresIn: process.env.EXPIREIN,
  });
};

export const restrictedTo = (...roles) => {
  return (req: RequestType, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: "You do not have permission!" });
    }
    next();
  };
};
