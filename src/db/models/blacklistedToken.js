import mongoose from 'mongoose';

const { Schema } = mongoose;

const BlacklistedTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlacklistedToken = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);

export default BlacklistedToken;
