import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RequestType } from "./../types";
import { CreateBlogs, UpdateBlogs } from "./types/blog.types";

const { blogs } = new PrismaClient();

export const createBlog = async (
  req: RequestType<CreateBlogs>,
  res: Response
) => {
  const { description, image, title } = req.body;
  console.log(req.file, req.files);
  const createBlog = await blogs.create({
    data: {
      description,
      image: req?.file?.path,
      title,
      userId: req.user.id,
    },
    select: {
      title: true,
      description: true,
      image: true,
      userId: true,
    },
  });
  if (!createBlog) {
    return res.status(400).send({ message: "Faild" });
  }
  res.status(201).send({ data: createBlog });
};

export const getMyBlogs = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const myblogs = await blogs.findMany({ where: { userId: req.user.id } });
  res.send({ data: myblogs });
};

export const AllBlogs = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const all = await blogs.findMany();
  res.send({ data: all });
};

export const updateBlogs = async (
  req: RequestType<UpdateBlogs>,
  res: Response,
  next: NextFunction
) => {
  const selectedBlogs = await blogs.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!selectedBlogs) {
    res.status(400).send({ message: "Wrong Id" });
  }

  const update: UpdateBlogs = {};
  if (req.body.description) {
    update.description = req.body.description;
  }

  if (req.body.title) {
    update.title = req.body.title;
  }

  if (req.file) {
    update.image = req.file.originalname;
  }

  const selectedBlog = await blogs.updateMany({
    where: { id: req.params.id, userId: req.user.id },
    data: { ...update },
  });

  res.status(200).send({ data: selectedBlog });
};
