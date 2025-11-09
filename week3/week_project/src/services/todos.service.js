const Todo = require('../models/Todos');

const getAllTodos = async (userId, filters = {}) => {
  const { status, priority, q, page = 1, limit = 10 } = filters;
  
  let filter = { user: userId };
  
  if (status === 'active') filter.completed = false;
  if (status === 'completed') filter.completed = true;
  
  if (priority && ['low', 'medium', 'high'].includes(priority)) {
    filter.priority = priority;
  }
  
  if (q) {
    filter.title = { $regex: q, $options: 'i' };
  }

  const todos = await Todo.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Todo.countDocuments(filter);

  return {
    todos,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit)
  };
};

const getTodoById = async (todoId, userId) => {
  const todo = await Todo.findOne({ 
    _id: todoId, 
    user: userId 
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo;
};

const createTodo = async (todoData, userId) => {
  const { title, priority, dueDate } = todoData;

  const existingTodo = await Todo.findOne({ 
    title, 
    user: userId 
  });
  
  if (existingTodo) {
    throw new Error('You already have a todo with this title');
  }

  const todo = new Todo({
    title,
    priority,
    dueDate,
    user: userId
  });

  await todo.save();
  return todo;
};

const updateTodo = async (todoId, updateData, userId) => {
  const { title, completed, priority, dueDate } = updateData;
  
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    { 
      ...updateData, 
      updatedAt: new Date() 
    },
    { new: true, runValidators: true }
  );

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo;
};

const deleteTodo = async (todoId, userId) => {
  const todo = await Todo.findOneAndDelete({ 
    _id: todoId, 
    user: userId 
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo;
};

const toggleTodo = async (todoId, userId) => {
  const todo = await Todo.findOne({ 
    _id: todoId, 
    user: userId 
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  todo.completed = !todo.completed;
  todo.updatedAt = new Date();
  await todo.save();

  return todo;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
};