import { Request } from 'express';
import { Service } from '../models/services';
import { WebError } from '../utilities/web-errors';

export class ServicesService {
    async list() {
        const { count, rows } = await Service.findAndCountAll()
        const response = {
            count,
            rows
        }
        return response
    }

    async details(service_id: string) {
        const id = service_id;
        const service = await Service.findByPk(id);
        if(!service) {
            throw WebError.BadRequest('invalid service_id, please review.')
        }
        return service.dataValues;
    }

    async create(service_type: string) {
        const oldService = await Service.findOne({ where: { service_type } })

        if(oldService){
            throw WebError.BadRequest(`This service already exists, please review.`)
        }

        const newService = await Service.create({
            service_type
        });

        return newService.dataValues;
    }
}