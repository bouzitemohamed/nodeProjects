const express=require('express');
const morgan=require('morgan');
require('dotenv').config();
const infoRouter=require('./routes/api/info');
const middlawereError=require('./middlewares/errorHandler');
const timeLimiter=require('./middlewares/timeLimiter');
const app=express();
app.use(express.json());
app.use(timeLimiter);
app.use(morgan('dev'));
app.use('/api',infoRouter);
app.get('/',(req,res,next)=>{
    try{
        res.json(`welcom to our mini project`);
    }catch(e){
        next(e);
    }
})
app.use(middlawereError);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`listening in port : ${PORT}`)
})