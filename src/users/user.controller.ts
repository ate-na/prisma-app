import { generateToken } from "./../auth/authentication";
import { LoginType, signupType, updateUser } from "./types/user.types";
import { RequestType } from "./../types";
import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";

const { user } = new PrismaClient();

export const signUp = async (req: RequestType<signupType>, res: Response) => {
  const { email, password, role, username, firstName, lastName } = req.body;
  const isUserExist = await user.findFirst({
    select: { password: false, email: true },
    where: { email: req.body.email },
  });

  if (isUserExist) {
    return res.status(400).send({ message: "This User Is Already Exist" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await user.create({
    data: {
      email,
      password: hashPassword,
      username,
      firstName,
      lastName,
      role,
    },
    select: { id: true, role: true },
  });

  const token = generateToken(newUser.id, newUser.role);
  res.status(200).send({ data: token });
};

export const login = async (
  req: RequestType<LoginType>,
  res: Response,
  next
) => {
  const { email, password } = req.body;
  console.log("email", email);
  const isUserExist = await user.findFirst({
    where: { email },
    select: { id: true, role: true, password: true },
  });

  console.log("user", isUserExist);

  if (!isUserExist) {
    return res
      .status(400)
      .send({ message: "Email Or Password Is Not Correct" });
  }
  const ismatch = await bcryptjs.compare(password, isUserExist.password);

  if (!ismatch) {
    return res
      .status(400)
      .send({ message: "Email Or Password Is Not Correct" });
  }

  const token = generateToken(isUserExist.id, isUserExist.role);

  return res.status(200).send({ data: token });
};

export const getProfile = async (req: RequestType, res: Response, next) => {
  const id = req.user.id;
  const profile = await user.findUnique({
    where: { id },
    select: {
      password: false,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      Blogs: true,
    }
  });

  res.status(200).send({ data: profile });
};

export const updateProfile = async (
  req: RequestType<updateUser>,
  res: Response
) => {
  const data = req.body;
  console.log("data", data);
  const selectedUser = await user.update({
    where: { id: req.user.id },
    data: { ...data },
    select: {
      username: true,
      lastName: true,
      role: true,
      firstName: true,
      email: true,
    },
  });
  if (!selectedUser) {
    return res.status(400).send({ message: "Invalid token" });
  }
  res.send({ data: selectedUser });
};
