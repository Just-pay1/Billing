import { Request } from 'express';
import { ActiveMerchants } from "../models/merchant";

export class MerchantsService {
    async listActiveMerchants(req: Request) {
        const page = req.query.page ? +req.query.page : -1;
        const limit = req.query.limit ? +req.query.limit : 10;
        const offset = (page - 1) * limit;
        let where: any;

        if (page != -1) {
            where = {
                offset,
                limit
            }
        }

        const { count, rows } = await ActiveMerchants.findAndCountAll(where)
        const response = {
            count,
            activePage: page,
            rows
        }
        return response
    }
}