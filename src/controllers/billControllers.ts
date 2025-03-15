// controllers/billController.ts
import { Request, Response } from "express";
import { fetchBillFromCompany } from "../services/billService";

export const getBill = async (req: Request, res: Response): Promise<void> => {
  const companyId: string = req.body.company_id || null;
  const user_id: string = req.body.user_id || null;

  if (!companyId || !user_id) {
    res.status(400).json({ error: "companyId & user_id are required" });
    return;
  }

  try {
    const billData = await fetchBillFromCompany(companyId, req.body);
    console.log(billData)
    res.status(200).json(billData);
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      res.status(504).json({ error: "Request timed out" });
    } else {
      res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
  }
};