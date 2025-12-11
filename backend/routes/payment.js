// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// const router = express.Router();

// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// });

// // ---------------- CREATE ORDER ----------------
// router.post("/create-order", async (req, res) => {
//     const options = {
//         amount: 50000,  // ₹500 => convert to paise
//         currency: "INR",
//         receipt: "receipt_order_1"
//     };
//     const order = await instance.orders.create(options);
//     res.json(order);
// });

// // ---------------- VERIFY PAYMENT ----------------
// router.post("/verify", async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expected = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//     if (expected === razorpay_signature) {
//         return res.json({ msg: "Payment verified" });
//     }

//     return res.status(400).json({ msg: "Invalid signature" });
// });

// export default router;
