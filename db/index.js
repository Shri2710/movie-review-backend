const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log('DB connected successfully');
}).catch((ex)=>{
    console.log('Error while connecting to DB',ex);
})