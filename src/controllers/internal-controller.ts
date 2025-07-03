import { InternalService } from "../services/internal-service";
import { Request, Response, NextFunction } from 'express'; 
import { responseHandler } from "../utilities/api-response";

export class InternalController {
    private service: InternalService;

    constructor() {
        this.service = new InternalService();
    }

   //   public listFailedTransactions = async (req: Request, res: Response, next: NextFunction) => {
   //      const page = req.body.page ? +req.body.page : -1;
   //      const limit = req.body.limit ? +req.body.limit : 10;
   //      const merchant_id = req.body.merchant_id;
   //      const response = await this.service.listFailedTransactions(merchant_id, page, limit);
   //      responseHandler(res, 200, 'failed transactions retrieved successfully', response);
   //   }

   //   public listSuccessfulTransactions = async (req: Request, res: Response, next: NextFunction) => {
   //      const page = req.body.page ? +req.body.page : -1;
   //      const limit = req.body.limit ? +req.body.limit : 10;
   //      const merchant_id = req.body.merchant_id;
   //      const response = await this.service.listSuccessfulTransactions(merchant_id, page, limit);
   //      responseHandler(res, 200, 'successful transactions retrieved successfully', response);
   //   }

     public ALLTransactions = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.body.page ? +req.body.page : -1;
        const limit = req.body.limit ? +req.body.limit : 10;
        const merchant_id = req.body.merchant_id;
        const response = await this.service.ALLTransactions(merchant_id, page, limit);
        responseHandler(res, 200, 'all transactions retrieved successfully', response);
     }
}