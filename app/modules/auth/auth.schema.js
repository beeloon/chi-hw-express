import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    default: '',
  },
  userId: {
    type: String,
    required: true,
    default: '',
  },
});

export default SessionSchema;
