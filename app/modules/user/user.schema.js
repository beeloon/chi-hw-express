import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().min(6).email().required(),
});

export default userSchema;
