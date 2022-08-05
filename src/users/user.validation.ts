import { Response } from "express";
import { Request } from "express";
import { UserRole } from "@prisma/client";
import * as Joi from "joi";

export const validationSignUp = () => {
  return Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().alphanum().min(3).max(300).optional(),
    lastName: Joi.string().alphanum().min(3).max(300).optional(),
    username: Joi.string().alphanum().min(3).max(300).required(),
    password: Joi.string().alphanum().min(8).max(300).required(),
    role: Joi.string()
      .alphanum()
      .min(3)
      .max(300)
      .required()
      .valid(UserRole.USER, UserRole.ADMIN),
  });
};

export const validationUpdateProfile = () => {
  return Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(300).optional(),
    lastName: Joi.string().alphanum().min(3).max(300).optional(),
    username: Joi.string().alphanum().min(3).max(300).optional(),
    password: Joi.string().alphanum().min(8).max(300).optional(),
    role: Joi.string()
      .alphanum()
      .min(3)
      .max(300)
      .optional()
      .valid(UserRole.USER, UserRole.ADMIN),
  });
};

export const validationLogin = () => {
  return Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(300).required(),
  });
};

export const validation = (schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next) => {
    console.log("ssss", req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).send({ message: error.message });
    next();
  };
};
