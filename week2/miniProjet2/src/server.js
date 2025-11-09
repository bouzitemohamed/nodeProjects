const app=require('./app');
require('dotenv').config();
const PORT=process.env.PORT;
app.get('/',(req,res)=>{
    res.send('hello world')
})
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(), 
    timestamp: new Date().toISOString()  
  });
});

app.listen(PORT,()=>{
    console.log('app listning in port ',PORT)
})