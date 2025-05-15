import { Router } from "express";
import { MerchantsRoutes } from "./merchants-routes";
import { BillsRoutes } from "./bills-routes";
import { ServicesRoutes } from "./services-routes";

class MainRoute {
    public router = Router();
    private merchants = new MerchantsRoutes()
    private bills = new BillsRoutes
    private services = new ServicesRoutes()

    constructor() {
        this.initializeAppRoutes();
    }

    private initializeAppRoutes() {
        this.router.use('/merchants', this.merchants.router)
        this.router.use('/bills', this.bills.router)
        this.router.use('/services', this.services.router)

    }

}

export default MainRoute;