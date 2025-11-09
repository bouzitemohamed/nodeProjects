const todoService = require('../services/todos.service');

const getAllTodos = async (req, res) => {
  try {
    const result = await todoService.getAllTodos(req.user._id, req.query);

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch todos',
      code: 500
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id, req.user._id);

    res.json({
      status: 'success',
      data: { todo }
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
      code: 404
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body, req.user._id);

    res.status(201).json({
      status: 'success',
      message: 'Todo created successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
      code: 400
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body, req.user._id);

    res.json({
      status: 'success',
      message: 'Todo updated successfully',
      data: { todo }
    });
  } catch (error) {
    if (error.message === 'Todo not found') {
      return res.status(404).json({
        status: 'error',
        message: error.message,
        code: 404
      });
    }
    res.status(400).json({
      status: 'error',
      message: error.message,
      code: 400
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id, req.user._id);

    res.json({
      status: 'success',
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
      code: 404
    });
  }
};

const toggleTodo = async (req, res) => {
  try {
    const todo = await todoService.toggleTodo(req.params.id, req.user._id);

    res.json({
      status: 'success',
      message: 'Todo toggled successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
      code: 404
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
};