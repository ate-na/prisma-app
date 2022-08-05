import Joi from "joi";

export const validationCreateBlog = () => {
  return Joi.object().keys({
    title: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(25).max(300),
    image: Joi.string().optional(),
  });
};

export const validationUpdateBlogs = () => {
  return Joi.object().keys({
    title: Joi.string().optional().min(3).max(20),
    description: Joi.string().optional().min(25).max(300),
    image: Joi.string().optional(),
  });
};
