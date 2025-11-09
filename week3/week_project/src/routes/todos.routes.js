const express = require('express');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todos.controller');
const authenticate = require('../middleware/auth');
const { validateTodo } = require('../middleware/validation');

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', validateTodo, createTodo);
router.patch('/:id', validateTodo, updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/toggle', toggleTodo);

module.exports = router;