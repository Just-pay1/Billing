import { Router } from "express";
import { BillController } from "../controllers/bills-controller";
import asyncHandler from "../middlewares/asyncWrapper";
import { validateSchemas } from "../middlewares/validateRequests";
import { billDetails, billDetailsViaID, details, updateBillStatus } from "../schemas/bill-schemas";


export class BillsRoutes {
    public router = Router();
    private controller = new BillController();

    constructor(){
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(){
        this.router.get('/get-bill-details',
            validateSchemas(details, 'query'),
            asyncHandler(this.controller.getBillDetails)
        )

        // this.router.get('/electric-bill-details', 
        //     validateSchemas(billDetails, 'query'),
        //     asyncHandler(this.controller.electricBillDetails)
        // )

        // this.router.get('/water-bill-details', 
        //     validateSchemas(billDetails, 'query'),
        //     asyncHandler(this.controller.waterBillDetails)
        // )

        // this.router.get('/gas-bill-details', 
        //     validateSchemas(billDetails, 'query'),
        //     asyncHandler(this.controller.gasBillDetails)
        // )

        // this.router.get('/internet-bill-details', 
        //     validateSchemas(billDetails, 'query'),
        //     asyncHandler(this.controller.internetBillDetails)
        // )

        this.router.post('/delete-bill', 
            validateSchemas(billDetailsViaID),
            asyncHandler(this.controller.deleteBill)
        )

        this.router.get('/bill-details', 
            validateSchemas(billDetailsViaID, 'query'),
            asyncHandler(this.controller.billDetails)
        )

        this.router.post('/update-bill-status', 
            validateSchemas(updateBillStatus),
            asyncHandler(this.controller.updateBillStatus)
        )
    }
    


}