import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authroutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cartRoutes from './routes/cart.js';
// import paymentRoutes from "./routes/payment.js";

// import chatRoute from "./routes/chat.js";


dotenv.config();        
const app=express();
const port = process.env.PORT || 5001; 
app.use(cors({
  origin: 'https://heroic-bonbon-55082e.netlify.app',
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

// app.use("/api/payment", paymentRoutes);
// app.use("/api/chat", chatRoute);

app.use('/api/cart',cartRoutes)

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://yourpawsomecare_db_user:ZSfjjowkvfvfl3GK@pawsome.tpunbs2.mongodb.net/?appName=PAWSOME")
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.use('/api/auth',authroutes)

app.get("/api/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ connected: true, collections });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});
app.use((req,res)=>{
    res.status(404).json({message:"route not found"});
})

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});



app.listen(port,(err)=>{
    if (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
    console.log(`server is running on port ${port}`);
}) 
