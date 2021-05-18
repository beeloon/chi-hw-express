import Joi from 'joi';

const followerSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    targetId: Joi.string().uuid().required(),
  }),
};

export default followerSchema;
