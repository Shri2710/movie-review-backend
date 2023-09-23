const { check,validationResult} = require("express-validator");

exports.userValidator=[
check("name").trim().not().isEmpty().withMessage("Name is missing"),
check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
check("password").not().isEmpty().withMessage("Passsword is missing").isLength({min:8,max:20}).withMessage("Password should be between 8 to 20 characters")
];

exports.validate=(req,res,next)=>{
    const error=validationResult(req).array();
        if(error.length){
            return res.json({error:error[0].msg})
        }
    next();
}