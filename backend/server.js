import { app } from "./app.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config({ path: './config.env' });


const DB = process.env.DB.replace('<db_password>',process.env.PASSWORD_DB);

mongoose.connect(DB).then(()=>{
  console.log('DB connected successfully');
}).catch((err)=>{
  console.log('Error connecting to DB',err);
})

const port = process.env.SERVER_PORT;



app.listen(port,()=>{
  console.log(`App lisitening on port:${port}`);
})
