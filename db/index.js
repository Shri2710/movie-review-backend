const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/moview_review')
.then(()=>{
  console.log('DB connected successfully');
}).catch((ex)=>{
    console.log('Error while connecting to DB',ex);
})