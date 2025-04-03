import Joi from 'joi';

export const VLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  forceLogin: Joi.boolean().optional(),
});

export const VRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('ADMIN', 'USER').required(),
});
