import { Router } from "express";
import { ServiceController } from "../controllers/services-controller";
import { validateSchemas } from "../middlewares/validateRequests";
import { create } from "../schemas/services-schemas";
import asyncHandler from "../middlewares/asyncWrapper";

export class ServicesRoutes {
    public router = Router();
    private controller = new ServiceController();

    constructor(){
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(){
        this.router.post('/list-all-services', 
            asyncHandler(this.controller.listServices)
        )

        this.router.post('/create-new-service', 
            validateSchemas(create),
            asyncHandler(this.controller.createNew)
        )

        this.router.post('/service-details', 
            asyncHandler(this.controller.details)
        )

    }
    


}