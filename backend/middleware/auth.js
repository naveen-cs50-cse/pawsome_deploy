// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function (req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "Invalid token" });

    req.user = user; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Auth failed" });
  }
}
