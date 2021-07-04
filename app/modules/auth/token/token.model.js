import { Schema, model } from 'mongoose';

const Token = new Schema({
  value: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model('Token', Token);
