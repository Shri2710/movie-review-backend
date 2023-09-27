exports.sendError=(res,error,statusCode=401)=>{
    res.statusCode(statusCode).json({ error });
}