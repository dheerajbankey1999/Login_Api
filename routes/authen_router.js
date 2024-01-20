var express = require('express');
const { signUp,login } = require('./authentication/controller');
var router = express.Router();
  const {auth,isStudent,isAdmin} = require("../middleware/auth");
/* GET users listing. */
router.post('/signup',signUp);
router.post("/login",login);
router.get("/test",auth,(req,res)=>{
  res.json({
    success:true,
    message:"This is protected router for user"
  })
})
router.get("/student",auth,isStudent,(req,res)=>{
     res.json({
      success:true,
    message:"This is protected router for student"
      
     })
});
router.get("/admin",auth,isAdmin,(req,res)=>{
  res.json({
    success:true,
    message:"This is protected router for admin"
    
  })
})
router.get('/in', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
