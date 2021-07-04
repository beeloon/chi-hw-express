import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Token = new Schema({
  value: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default model('Token', Token);
