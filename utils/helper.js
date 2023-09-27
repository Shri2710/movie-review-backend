const crypto = require('crypto');

exports.sendError=(res,error,statusCode=401)=>{
    return res.status(statusCode).json({ error });
}


exports.generateRandomBytes = () =>{
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(30,(error,buffer)=>{
            if(error) reject(error);
      
            const buff = buffer.toString('hex');

            resolve(buff);
         })
    })
}