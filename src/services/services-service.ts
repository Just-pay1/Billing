import { Request } from 'express';
import { Service } from '../models/services';
import { WebError } from '../utilities/web-errors';

export class ServicesService {
    async list(req: Request) {
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

        const { count, rows } = await Service.findAndCountAll(where)
        const response = {
            count,
            activePage: page,
            rows
        }
        return response
    }

    async create(service_type: string) {
        const oldService = await Service.findOne({ where: {service_type} })

        if(oldService){
            throw WebError.BadRequest(`This service already exists, please review.`)
        }

        const newService = await Service.create({
            service_type
        });

        return newService.dataValues;
    }
}