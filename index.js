import express from "express"
import mongoose from "mongoose";
import movRouter from "./routes/movRoutes.js";


//create an express app
const app = express();

//Database Connection
await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err)
});

//Use Global Middleware
app.use(express.json());

//Use Exported route
app.use('/User', movRouter)

//Server is Listening
const PORT = 3600;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})