const express=require('express');
const helmet=require('helmet');
require('dotenv').config();
const todosRoutes=require('./routes/todos.routes');
const logger=require('./middlewares/logger');
const errorHandler=require('./middlewares/errorHandler');
const app=express();
app.use(logger);
app.use(helmet());
app.use(express.json())
app.use('/api/todos',todosRoutes);

const PORT=process.env.PORT;
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log("server listing know in the port :",PORT);
})