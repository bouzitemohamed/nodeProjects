const express=require('express');
const router=express.Router();
const todosController=require('../controllers/todos.controller');
const todosMiddlewares=require('../middlewares/validateReq');
router.get('/',todosController.getAllTodos);
router.get('/:id',todosController.getOneTodos)
router.post('/',todosMiddlewares,todosController.createOneTodos);
router.delete('/:id',todosController.deletOneTodos);
router.patch('/:id',todosController.updateOneTodosPartiellemnt);
router.patch('/:id/toggle',todosController.toggleCompletedTodo);
module.exports=router;