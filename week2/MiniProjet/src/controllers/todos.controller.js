const todoServices = require('../services/todos.service');
const sendJson = require('../utils/sendJson');

const getAllTodos = (req, res) => {
   try {
      const data = todoServices.getAll(req);
      if (data) {
         sendJson(res, data, 200); 
      } else {
         sendJson(res, 'Failed to get data', 400);
      }
   } catch (e) {
      sendJson(res, e.message, 500);
   }
};
const getOneTodos = (req, res) => {
   try {
      const id=parseInt(req.params.id)
      const data = todoServices.getOne(id);
      if (data) {
         sendJson(res, data, 200); 
      } else {
         sendJson(res, `todos with id ${id} not found`, 400);
      }
   } catch (e) {
      sendJson(res, e.message, 500);
   }
};
const createOneTodos=(req,res)=>{
   try {
      const data = todoServices.createOne(req);
      if (data) {
         sendJson(res, data, 201); 
      } else {
         sendJson(res, 'Failed to create todos', 400);
      }
   } catch (e) {
      sendJson(res, e.message, 500);
   }
}
const deletOneTodos=(req,res)=>{
     try{
        id=parseInt(req.params.id);
        data=todoServices.deletOne(id);
        if (data) {
         sendJson(res, data, 204); 
      } else {
         sendJson(res, 'Failed to delet todos', 400);
      }
     }catch(e){
        sendJson(res, e.message, 500);
     }
}
const updateOneTodosPartiellemnt=(req,res)=>{
     try{
        id=parseInt(req.params.id);
        data=todoServices.updateOnePartiellement(req,id);
        if (data) {
         sendJson(res, data, 200); 
      } else {
         sendJson(res, 'Failed to update todos', 400);
      }
     }catch(e){
        sendJson(res, e.message, 500);
     }
}
const toggleCompletedTodo = (req, res) => {
  try {
    const id=parseInt(req.params.id);
    const updatedTodo = todoServices.toggleCompleted(id);

    if (!updatedTodo) {
      return sendJson(res, `Todo with id ${req.params.id} not found`, 404);
    }

    sendJson(res, updatedTodo, 200);
  } catch (e) {
    sendJson(res, e.message, 500);
  }
};
module.exports = {
    getAllTodos,
    getOneTodos,
    createOneTodos,
    deletOneTodos,
    updateOneTodosPartiellemnt,
    toggleCompletedTodo
};
