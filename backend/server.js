import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authroutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cartRoutes from './routes/cart.js';
import cartmongoose from '../backend/models/cart.js'
// import paymentRoutes from "./routes/payment.js";

// import chatRoute from "./routes/chat.js";


dotenv.config();        
const app=express();
const port=5001; 
app.use(cors({
    origin: true,
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());

// app.use("/api/payment", paymentRoutes);
// app.use("/api/chat", chatRoute);

app.use('/api/cart',cartRoutes)
app.use('/models/cart',cartmongoose)

mongoose.connect("mongodb+srv://yourpawsomecare_db_user:ZSfjjowkvfvfl3GK@pawsome.tpunbs2.mongodb.net/?appName=PAWSOME")
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})

app.use('/api/auth',authroutes)

app.use((req,res)=>{
    res.status(404).json({message:"route not found"});
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
}) 
