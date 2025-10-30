const express = require('express');
const path=require('path');
const app=require('../Activité1-“Hello Express!”/server');
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use((req,res,next)=>{
   req.StartTime=Date.now();
   next();
})

app.get('/ping',(req,res)=>{
  const reqDuration=Date.now()-req.StartTime;
  res.json({
    message:'ping',
    duration:`${reqDuration} ms`
  })
})
app.get('/api/products', (req, res) => {
    const data = fs.readFileSync('./data/products.json');
    const products = JSON.parse(data);
    res.json(products);
});
app.get('/api/products/:id', (req, res) => {
    res.json({ message: `Produit ${req.params.id}` });
});
app.get('/api/crash', (req, res, next) => {
  const err = new Error('Erreur simulée ');
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.message);
  res.status(500).json({ error: err.message });
});
const fs = require('fs');


