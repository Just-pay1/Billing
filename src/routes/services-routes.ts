import { Router } from "express";
import { ServiceController } from "../controllers/services-controller";
import { validateSchemas } from "../middlewares/validateRequests";
import { create, list } from "../schemas/services-schemas";
import asyncHandler from "../middlewares/asyncWrapper";

export class ServicesRoutes {
    public router = Router();
    private controller = new ServiceController();

    constructor(){
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(){
        this.router.get('/list-all-services', 
            validateSchemas(list, 'query'),
            asyncHandler(this.controller.listServices)
        )

        this.router.post('/create-new', 
            validateSchemas(create),
            asyncHandler(this.controller.createNew)
        )
    }
    


}