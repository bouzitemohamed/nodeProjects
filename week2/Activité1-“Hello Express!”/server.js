const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send('bienvenue sur mon premiere Express');

});
app.listen(3000,()=>{
  console.log('serveur listen sur port 3000 via http://localhost:3000')
})
module.exports=app;