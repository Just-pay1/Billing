import { Router } from "express";
import { validateSchemas } from "../middlewares/validateRequests";
import asyncHandler from "../middlewares/asyncWrapper";
import { internal } from "../schemas/internal-schemas";
import { InternalController } from "../controllers/internal-controller";

export class InternalRoutes {
    public router = Router();
    private controller = new InternalController();

    constructor() {
        this.initializeInternalRoutes();
    }

    private initializeInternalRoutes(){
        this.router.post('/list-failled-transactions',
            validateSchemas(internal.merchantTransactions),
            asyncHandler(this.controller.listFailedTransactions)
        )

        this.router.post('/list-successful-transactions',
            validateSchemas(internal.merchantTransactions),
            asyncHandler(this.controller.listSuccessfulTransactions)
        )
    }

}