import mongoose from 'mongoose';

import SessionSchema from './auth.schema';

const Session = mongoose.model('Session', SessionSchema);

export default Session;
