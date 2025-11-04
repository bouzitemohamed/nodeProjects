const app=require('./app');
require('dotenv').config();
const PORT=process.env.PORT;
app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(PORT,()=>{
    console.log('app listning in port ',PORT)
})