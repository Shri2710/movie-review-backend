const express=require("express");
const userRouter=require("./router/user");
require('./db');
const app=express();

app.use(express.json())
app.use('/api/user',userRouter);


app.get('/about',(req,res)=>{
    res.send("<h1>About</h1>") 
})

app.listen(8000,()=>{
    console.log("The port is listening on port 8000");
})