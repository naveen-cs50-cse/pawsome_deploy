import { Router } from "express";
import Cart from "../models/cart.js";
import auth from "../middleware/auth.js";

const router = Router();

// All routes require login
router.use(auth);

// -------------------- GET CART --------------------
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userid: req.user._id });
    return res.json({ items: cart?.items || [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "cart server error" });
  }
});

// -------------------- ADD ITEM --------------------
router.post("/add", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { pid, pname, pprice, pimage, pqty = 1 } = req.body;

    if (!pid)
      return res.status(400).json({ msg: "pid required" });

    let cart = await Cart.findOne({ userid: req.user._id });

    if (!cart) {
      cart = new Cart({
        userid: req.user._id,
        items: [{ pid, pname, pprice, pimage, pqty }]
      });
    } else {
      const existing = cart.items.find(i => i.pid === pid);

      if (existing) {
        existing.pqty += Number(pqty);
      } else {
        cart.items.push({ pid, pname, pprice, pimage, pqty });
      }
    }

    await cart.save();
    return res.json({ items: cart.items });

  } catch (err) {
    console.error("ADD ERROR", err);
    return res.status(500).json({ msg: "add cart server error" });
  }
});

// -------------------- UPDATE QTY --------------------
router.patch("/update", async (req, res) => {
  try {
    const { pid, pqty } = req.body;

    if (!pid || !Number.isFinite(Number(pqty)))
      return res.status(400).json({ msg: "pid and numeric qty required" });

    const cart = await Cart.findOne({ userid: req.user._id });
    if (!cart) return res.status(404).json({ msg: "cart not found" });

    const item = cart.items.find(i => i.pid === pid);
    if (!item) return res.status(404).json({ msg: "item not found" });

    const newQty = Number(pqty);

    if (newQty <= 0) {
      cart.items = cart.items.filter(i => i.pid !== pid);
    } else {
      item.pqty = newQty;
    }

    await cart.save();
    return res.json({ items: cart.items });

  } catch (err) {
    console.error("UPDATE ERROR", err);
    return res.status(500).json({ msg: "update server error" });
  }
});

// -------------------- REMOVE ITEM --------------------
router.delete("/remove", async (req, res) => {
  try {
    const { pid } = req.body;

    if (!pid)
      return res.status(400).json({ msg: "pid required" });

    const cart = await Cart.findOne({ userid: req.user._id });
    if (!cart) return res.status(404).json({ msg: "cart not found" });

    cart.items = cart.items.filter(i => i.pid !== pid);
    await cart.save();

    return res.json({ items: cart.items });
  } catch (err) {
    console.error("REMOVE ERROR", err);
    return res.status(500).json({ msg: "server error" });
  }
});

// -------------------- CLEAR CART --------------------
router.delete("/clear", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userid: req.user._id });
    return res.json({ msg: "Cart cleared" });
  } catch (err) {
    console.error("CLEAR ERROR", err);
    return res.status(500).json({ msg: "server error" });
  }
});

export default router;
