import { Request, Response, NextFunction } from 'express'; 
import { responseHandler } from "../utilities/api-response";
import { BillService } from '../services/bills-service';

export class BillController {
    private service: BillService;

    constructor() {
        this.service = new BillService();
    }

    public getBillDetails = async (req: Request, res: Response, next: NextFunction) => {
        const merchant_id = req.body.merchant_id;
        const service_id = req.body.service_id;
        const bill_code = req.body.bill_code;
        const response = await this.service.getBill(service_id, merchant_id, bill_code);
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
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

    public internetBillDetails = async (req: Request, res: Response, next: NextFunction) => {
        const merchant_id = req.body.merchant_id;
        const bill_code = req.body.bill_code;
        const response = await this.service.getInternetBill(merchant_id, bill_code)
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
    }

    public billDetails = async (req: Request, res: Response, next: NextFunction) => {
        const bill_id = req.body.bill_id
        const response = await this.service.getBillDetails(bill_id)
        responseHandler(res, 200, 'Bill is fetched successfully!', response)
    }

    public updateBillStatus = async (req: Request, res: Response, next: NextFunction) => {
        const bill_id = req.body.bill_id
        const user_id = req.body.user_id
        const paid_amount = +req.body.paid_amount
        // const payment_method = req.body.payment_method
        const response = await this.service.updateBillStatus(bill_id, user_id, paid_amount)
        responseHandler(res, 200, 'Bill is updated successfully!', response)

    } 

    public deleteBill = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.deleteBill(req.body.bill_id)
        responseHandler(res, 200, 'Bill is deleted successfully!', response)
    }
}