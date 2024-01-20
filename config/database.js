const mongoose =require("mongoose");
require("dotenv").config();
const database =async ()=>{
  await    mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true, // Note: This is no longer needed but doesn't harm
    useUnifiedTopology: true
  })
    .then(()=>{
        console.log("Database is connected");
    })
   .catch((err)=>{
    console.log(err);
   })

}
module.exports =database;