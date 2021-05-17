import Joi from 'joi';

const postSchema = Joi.object({
  text: Joi.string().required(),
  authorId: Joi.string().uuid().required(),
});

export default postSchema;
