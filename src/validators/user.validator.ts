import Joi from 'joi';

export const VEditUserSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  password: Joi.string().optional(),
  role: Joi.string().valid('ADMIN', 'USER').optional(),
});
