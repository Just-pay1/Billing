import { MerchantsService } from "../services/merchants-service";
import { Request, Response, NextFunction } from 'express'; 
import { responseHandler } from "../utilities/api-response";

export class MerchantsController {
    private service: MerchantsService;

    constructor() {
        this.service = new MerchantsService();
    }

    public listMerchants = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.listActiveMerchants(req)
        responseHandler(res, 200, 'List of merchants fetched successfully!', response)
    }
}