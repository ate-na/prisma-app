import * as express from "express";
import { auth } from "../auth/authentication";
import { getProfile, login, signUp, updateProfile } from "./user.controller";
import {
  validation,
  validationLogin,
  validationSignUp,
  validationUpdateProfile,
} from "./user.validation";
const router = express.Router();

router.post("/signup", validation(validationSignUp()), signUp);

router.post("/login", validation(validationLogin()), login);

router.get("/", auth, getProfile);

router.patch("/", validation(validationUpdateProfile()), auth, updateProfile);

export default router;
