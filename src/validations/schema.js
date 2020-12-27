import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid id in params').required(),
});

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
}).or('name', 'email');

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const taskSchema = Joi.object({
  description: Joi.string().required(),
  userId: Joi.string().required(),
});

const inviteUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export {
  userUpdateSchema,
  userRegisterSchema,
  userLoginSchema,
  idSchema,
  taskSchema,
  inviteUserSchema,
};
