import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('task', TaskSchema);

export default Task;
