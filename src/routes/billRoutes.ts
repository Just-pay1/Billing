// routes/billRoutes.ts
import { Router } from "express";
import { getBill } from "../controllers/billControllers";

const router = Router();

router.post("/", getBill);

export default router;