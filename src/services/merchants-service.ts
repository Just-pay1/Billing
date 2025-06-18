import { Request } from 'express';
import { ActiveMerchants } from "../models/merchant";
import { Service } from '../models/services';

export class MerchantsService {
    async listActiveMerchants(req: Request) {
        const page = req.query.page ? +req.query.page : -1;
        const limit = req.query.limit ? +req.query.limit : 10;
        const offset = (page - 1) * limit;
        const includeMerchants = {
            model: ActiveMerchants,
            as: 'merchants',
            attributes: ['merchant_id', 'commercial_name']
        };
        let opt: any = {
            include: [includeMerchants],
        };

        if (page != -1) {
            opt = {
                include: [includeMerchants],
                offset,
                limit
            }
        }

        const { count, rows } = await Service.findAndCountAll(opt)
        const response = {
            count,
            activePage: page,
            rows
        }
        return response
    }
}