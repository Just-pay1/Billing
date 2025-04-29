import { Router } from "express";
import { MerchantsController } from "../controllers/merchants-controller";
import asyncHandler from "../middlewares/asyncWrapper";
import { validateSchemas } from "../middlewares/validateRequests";
import { listSchema } from "../schemas/merchants-schemas";

export class MerchantsRoutes {
    public router = Router();
    private controller = new MerchantsController();

    constructor(){
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(){
        this.router.get('/list-active-merchants', 
            validateSchemas(listSchema, 'query'),
            asyncHandler(this.controller.listMerchants)
        )
    }


}