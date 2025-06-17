import { Request, Response, NextFunction } from 'express'; 
import { ServicesService } from "../services/services-service";
import { responseHandler } from '../utilities/api-response';

export class ServiceController {
    private service: ServicesService;

    constructor() {
        this.service = new ServicesService();
    }

    public listServices = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.list()
        responseHandler(res, 200, 'List of services fetched successfully!', response)
    }

    public createNew = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.create(req.body.service_type)
        responseHandler(res, 200, 'Service created successfully!', response)
    }

    public details = async (req: Request, res: Response, next: NextFunction) => {
        const response = await this.service.details(req.body.service_id);
        responseHandler(res, 200, 'Service fetched successfully!', response)
    }


}