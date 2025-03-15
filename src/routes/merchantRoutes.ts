import { Router } from "express";
import Merchant from "../models/merchant";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const merchants = await Merchant.findAll();
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch merchants" });
  }
});

export default router;
