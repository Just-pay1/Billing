import { Request, Response, NextFunction } from 'express'; 
import { responseHandler } from "../utilities/api-response";
import { BillService } from '../services/bills-service';

export class BillController {
    private service: BillService;

    constructor() {
        this.service = new BillService();
    }

    public electricBillDetails = async (req: Request, res: Response, next: NextFunction) => {
        const merchant_id = req.body.merchant_id;
        const bill_code = req.body.bill_code;
        const response = await this.service.getElectricBill(merchant_id, bill_code)
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
    }

    public waterBillDetails = async (req: Request, res: Response, next: NextFunction) => {
        const merchant_id = req.body.merchant_id;
        const bill_code = req.body.bill_code;
        const response = await this.service.getWaterBill(merchant_id, bill_code)
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
    }

    public gasBillDetails = async (req: Request, res: Response, next: NextFunction) => {
        const merchant_id = req.body.merchant_id;
        const bill_code = req.body.bill_code;
        const response = await this.service.getGasBill(merchant_id, bill_code)
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
    }

    public deleteBill = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.deleteBill(req.body.bill_id)
        responseHandler(res, 200, 'Bill is deleted successfully!', response)
    }
}