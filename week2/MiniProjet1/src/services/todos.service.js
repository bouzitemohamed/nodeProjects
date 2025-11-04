const fs = require('fs');
const path = require('path');

const todosFile = path.join(__dirname, '../data/todos.json');

function loadTodos() {
  if (!fs.existsSync(todosFile)) return [];
  const data = fs.readFileSync(todosFile, 'utf-8');
  return JSON.parse(data);
}

function getAll(req) {
    let todos = loadTodos();
    const { status, priority, q, page = 1, limit = 10, sort = 'asc' } = req.query;

    if (status && status !== 'all') {
        if (status === 'completed') {
            todos = todos.filter(todo => todo.completed === true);
        } else if (status === 'active') {
            todos = todos.filter(todo => todo.completed === false);
        }
    }

    if (priority) {
        todos = todos.filter(todo => todo.priority === priority);
    }

    if (q) {
        todos = todos.filter(todo => todo.title.toLowerCase().includes(q.toLowerCase()));
    }

    todos.sort((a, b) => {
        if (sort === 'desc') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const startIndex = (pageNumber - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;

    const paginatedTodos = todos.slice(startIndex, endIndex);

    return {
        total: todos.length,
        page: pageNumber,
        limit: pageLimit,
        data: paginatedTodos
    };
}

function getOne(id){
   const todos=loadTodos();
   const data=todos.find(l=>l.id===id);
   return data;
}
function createOne(req) {
  const todosList = loadTodos();

  const idOfLastElement = todosList.length > 0 ? todosList[todosList.length - 1].id : 0;

  const newTodo = {
    id: idOfLastElement + 1,
    title: req.body.title,
    completed: false,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: ""
  };

  todosList.push(newTodo);


  fs.writeFileSync(todosFile, JSON.stringify(todosList, null, 2));

  return todosList;
}
function deletOne(id) {
  const todos = loadTodos();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  fs.writeFileSync(todosFile, JSON.stringify(updatedTodos, null, 2));

  return updatedTodos;
}
function updateOnePartiellement(req, id) {
  const todos = loadTodos();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;
  const targetedTodo = todos[index];
  if (req.body.title) targetedTodo.title = req.body.title;
  if (req.body.dueDate) targetedTodo.dueDate = req.body.dueDate;
  if (req.body.priority) targetedTodo.priority = req.body.priority;
  if (req.body.completed !== undefined) targetedTodo.completed = req.body.completed;
  targetedTodo.updatedAt = new Date().toISOString();
  todos[index] = targetedTodo;
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));

  return targetedTodo;
}
function toggleCompleted(id){
   const todos=loadTodos();
   const indexOftargetedTodos=todos.findIndex(l=>l.id===id);
   if (indexOftargetedTodos === -1) return null;
   const targetedTodo=todos[indexOftargetedTodos];
   targetedTodo.completed=!targetedTodo.completed;
   targetedTodo.updatedAt=new Date().toISOString();
   todos[indexOftargetedTodos]=targetedTodo;
   fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
   return targetedTodo;

}
module.exports = {
  getAll,
  getOne,
  createOne,
  deletOne,
  updateOnePartiellement,
  toggleCompleted
};
