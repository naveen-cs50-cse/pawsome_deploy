import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utilities/emailservice.js";
// import fetch from "node-fetch";


const router = Router();

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    console.log("📝 Register request received:", req.body);

    const { username, email, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "username and password required" });

    let existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ msg: "User already exists" });

    let user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });

    await sendEmail(email,"welcome to PAWSOME 🎉",`Hello ${username} !! your account has been created succesfully`);

  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});


// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const email=user.email;
    if (!user)
      return res.status(400).json({ msg: "User not found" });
    
    if (user.password !== password)
      return res.status(400).json({ msg: "Wrong password" });
    
    await sendEmail(email,"welcome back!!",`welcome back ${username} to pawsome as you did login attempt`); 
    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });


    return res.json({ msg: "Login successful" });

    

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});


// ---------------- PROFILE (AUTH CHECK) ----------------
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ msg: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    return res.json({ user });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid token" });
  }
});


router.post("/askGemini", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GOOGLE_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log("Gemini API Response:", data);

        res.json(data);

    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/emailsitting",async (req,res)=>{
  try{
         const {useremail,servicename,address,datetime}=req.body;
         
         await sendEmail(useremail,"Booking confirmed ✅",`BOOKING DETAILS :  ${servicename}\n\n \n Address : ${address} \n Date - time : ${datetime} `);
         return res.json({msg:"useremail sent"});
  }catch(err){
    console.log(err);
  }

})
router.post("/emailhealth",async (req,res)=>{
  try{
         const {useremail,servicename,doctor,date,time}=req.body;
         
         await sendEmail(useremail,"Health Booking confirmed ✅",`BOOKING DETAILS :  ${servicename}\n\n \n DOCTOR : ${doctor} \n Date - time : ${date}-${time} `);
         return res.json({msg:"useremail sent"});
  }catch(err){
    console.log(err);
  }

})

router.post("/emailgrooming",async (req,res)=>{
  try{
         const {useremail,servicename,address,datetime}=req.body;
         
         await sendEmail(useremail,"Grooming Booking confirmed ✅",`BOOKING DETAILS :  ${servicename}\n\n \n Address : ${address} \n Date - time : ${datetime} `);
         return res.json({msg:"useremail sent"});
  }catch(err){
    console.log(err);
  }

})

router.post("/checkoutEmail", async (req, res) => {
  try {
    const { useremail, itemList, total } = req.body;

    const message =
      `🛍️ Your Order Summary from PAWSOME\n\n` +
      `Items:\n${itemList}\n\n` +
      `Total Price: ₹${total}\n\n` +
      `Thank you for shopping with us ❤️🐾`;

    await sendEmail(useremail, "Your Pawsome Order Receipt 🧾", message);

    res.json({ msg: "Order email sent" });

  } catch (err) {
    console.log("Checkout Email Error:", err);
    res.status(500).json({ msg: "email error" });
  }
});


// ---------------- LOGOUT ----------------
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
});



export default router;
