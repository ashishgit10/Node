import mongoose, { connect } from "mongoose";
/* import { DB_NAME } from "./constants.js";
import express from "express" */
import dotenv from "dotenv";
import connectDb from "./db/Connections.js";
import app from "./app.js"
dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT:${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log("failed to connect to Database", err)
  })



  
/* (async () => {
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
   app.on("err",()=>
   {console.log("err:",err)
   throw err
   })
   app.listen(process.env.PORT,()=>{
    console.log(`App is Listening to PORT ${process.env.PORT}`)
   })
  } catch (error) {
    console.error("ERROR", error);
    throw err;
  }
})();
 */
