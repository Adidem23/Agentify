const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const AgentifyRoutes=require('./Routes/routes')
const CORS=require('cors');
require('dotenv').config();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(CORS({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/api',AgentifyRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});