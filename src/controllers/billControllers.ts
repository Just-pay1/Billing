// controllers/billController.ts
import { Request, Response } from "express";
import { fetchBillFromCompany } from "../services/billService";
import { getBillSchema } from "../schemas/billValidation";


export const getBill = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = getBillSchema.validate(req.body);
  const companyId = value.company_id;

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    const billData = await fetchBillFromCompany(companyId, req.body);
    res.status(200).json(billData);
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      res.status(504).json({ error: "Request timed out" });
    } else {
      const statusCode = error.response?.status || error.status || 500;
      res.status(statusCode).json({ error: error.response.data.msg });
    }
  }
};