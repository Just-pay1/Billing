import { Router } from "express";
import { MerchantsRoutes } from "./merchants-routes";
import { BillsRoutes } from "./bills-routes";

class MainRoute {
    public router = Router();
    private merchants = new MerchantsRoutes()
    private bills = new BillsRoutes

    constructor() {
        this.initializeAppRoutes();
    }

    private initializeAppRoutes() {
        this.router.use('/merchants', this.merchants.router)
        this.router.use('/bills', this.bills.router)
    }

}

export default MainRoute;