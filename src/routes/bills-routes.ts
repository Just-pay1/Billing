import { Router } from "express";
import { BillController } from "../controllers/bills-controller";
import asyncHandler from "../middlewares/asyncWrapper";
import { validateSchemas } from "../middlewares/validateRequests";
import { billDetails, deleteBill } from "../schemas/bill-schemas";


export class BillsRoutes {
    public router = Router();
    private controller = new BillController();

    constructor(){
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(){
        this.router.get('/electric-bill-details', 
            validateSchemas(billDetails, 'query'),
            asyncHandler(this.controller.electricBillDetails)
        )

        this.router.get('/water-bill-details', 
            validateSchemas(billDetails, 'query'),
            asyncHandler(this.controller.waterBillDetails)
        )

        this.router.get('/gas-bill-details', 
            validateSchemas(billDetails, 'query'),
            asyncHandler(this.controller.gasBillDetails)
        )

        this.router.post('/delete-bill', 
            validateSchemas(deleteBill),
            asyncHandler(this.controller.deleteBill)
        )
    }
    


}