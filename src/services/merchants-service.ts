import { Request } from 'express';
import { ActiveMerchants } from "../models/merchant";
import { makeRequest } from '../utilities/makeInternalRequest';
// import { Service } from '../models/services';

export class MerchantsService {
    async listActiveMerchants(req: Request) {
        const page = req.query.page ? +req.query.page : -1;
        const limit = req.query.limit ? +req.query.limit : 10;
        const offset = (page - 1) * limit;

        const response = await makeRequest({
            method: 'post',
            service: 'crm',
            path: 'internal/list-services-with-active-merchants',
            context: { page, limit, offset }
        })

        return response

    }
}