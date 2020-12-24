import Task from '../db/models/task';

// create a new task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ description: req.body.description, state: 'todo' });

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
export const getTasks = async (req, res) => {
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
    await Task.remove({ _id: req.params.id });

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
