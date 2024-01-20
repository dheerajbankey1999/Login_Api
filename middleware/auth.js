const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth =(req,res,next)=>{
   try{
   // const token = req.cookies.token;
   //const token = req.header("Authorization").replace("Beared ", "");
    const token = req.body.token;
    console.log(token);
    if(!token){
      res.json({
          sucess:false,
          message:"Token is missing"
      })
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_KEY);
        // console.log(decode);
        req.user= decode;
        // console.log(req.user.role);
        // console.log(req.user);

    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "Token is not verified"
        })
    }
    next();
   }
   catch(err){
    console.log(err);
    res.status(401).json({
           success:false,
           message: "Something went wrong"
    })
   }
}
exports.isStudent =(req,res,next)=>{
         try{
              if(req.user.role !=="Student"){
                res.status(401).json({
                    success: false,
                    message:" The student is not valid in the isStudent function"
                })
              }
              next();
         }
        catch(err){
               console.log(err);
               res.status(400).json({
                sucess: false,
                message:"Student and user.role is not matching"
               })
          }
}
exports.isAdmin =(req,res,next)=>{
    try{
         if(req.user.role !=="Admin"){
           res.status(401).json({
               success: false,
               message:" The student is not equal in the isAdmin function"
           })
         }
         next();
    }
   catch(err){
          console.log(err);
          res.status(400).json({
           sucess: false,
           message:"Admin and user.role is not matching"
          })
     }
}