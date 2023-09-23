const User=require('../models/user');

exports.create= async (req,res)=>{
    try{

    console.log(req.body);
    const {name,email,password}=req.body;
    const oldUser=User.findOne({email});

    if(oldUser){
        return res.status(401).json({message:"User Already exist"});
    }
    const newUser=new User({name,email,password});
    await newUser.save();
    res.json(newUser) 
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}