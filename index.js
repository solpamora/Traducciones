import express from 'express';
import bodyParser from 'body-parser';
import calculadoraRoutes from './routes/calculadora.js';

const app= express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());


app.use('/calculadora',calculadoraRoutes);

//console.log('hola');
//app.get('/',(req,res)=>res.send('hola'));

app.listen(PORT,()=>console.log(`Server Running on port http://localhost:${PORT}`));