import { restrictedTo } from "./../auth/authentication";
import {
  validationCreateBlog,
  validationUpdateBlogs,
} from "./blogs.validation";
import { upload } from "./multer";
import express from "express";
import { auth } from "../auth/authentication";
import {
  AllBlogs,
  createBlog,
  getMyBlogs,
  updateBlogs,
} from "./blogs.controller";
import { validation } from "../users/user.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  upload,
  validation(validationCreateBlog()),
  auth,
  restrictedTo(UserRole.ADMIN),
  createBlog
);

router.get("/my-blogs", auth, getMyBlogs);

router.get("/", auth, AllBlogs);

router.patch(
  "/my-blog/:id",
  upload,
  validation(validationUpdateBlogs()),
  auth,
  restrictedTo(UserRole.ADMIN),
  updateBlogs
);

export default router;
