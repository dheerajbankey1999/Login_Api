const user = require("./model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req,res) =>{
    try{
     const { name, email,password, role} = req.body;
     const existingUser =  await user.findOne({email});
     if(existingUser){
          res.status('400').json({
            success: false,
            response:"User already exist"
        })
    }
    let hashedPassword;
   try{
             hashedPassword = await bcrypt.hash(password, 10);
   }
   catch(err){
    console.log(err);
   }
   const newUser = await  user.create({
             name,email,password:hashedPassword,role
   });
     return res.json({
        success:"True",
        user:newUser
     })
    }
    catch(err){
      console.log(err);
    }
}
exports.login = async(req,res)=>{
    try{
              //data fetch
              const {email,password} = req.body;
              //validate
              if(!email || !password){
                        res.json({
                        success:"false",
                        message:"please fill all datail"
                        })
              }
              let User =  await user.findOne({email});
              // console.log("User id",User);
              if(!User){
                res.json({
                    success: false,
                    message:"User is not registered"
                })
              }
              const payload={
                email:User.email,
                id: User._id,
                role: User.role
              }
              //  console.log("user password",User.password);
              if(await bcrypt.compare(password,User.password)){
                      const token = jwt.sign(payload,process.env.JWT_KEY,{
                        expiresIn: '2hr'
                      });
                      User= User.toObject();
                      User.token=token;
                      User.password = undefined;
                      const options= {
                               expires: new Date(Date.now() + 3*24*60*60*1000),
                               httpOnly:true
                      }
                      res.cookie("token",token,options).status(200).json({
                        success: true,
                        token,
                        User,
                        message:"User logged in successfully"
                      })
              }
            else{
              res.json({
                success:false,
                 message:"Password isn't correct"
              })
            }
    }
    catch(err){
        console.log(err);
    }

}