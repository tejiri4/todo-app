import mongoose from 'mongoose';
import Task from '../db/models/task';
import User from '../db/models/user';

const { ObjectId } = mongoose.Types;

// create a new task
export const createTask = async (req, res) => {
  try {
    const {
      userId,
      description,
    } = req.body;

    const user = User.findOne({ _id: userId });

    if (!user) {
      return res.status(200).json({
        message: 'User not found.',
      });
    }

    const task = await Task.create({ description, userId: new ObjectId(userId), state: 'todo' });

    return res.status(200).json({
      message: 'Task created.',
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// retrieve all task
export const getTasks = async (_, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// retrieve a single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    return res.status(200).json({
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// delete a task
export const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: 'Task was deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// update a task
export const completeTask = async (req, res) => {
  try {
    await Task.updateOne({ _id: req.params.id }, { state: 'done' });

    return res.status(200).json({
      message: 'Task was completed successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
