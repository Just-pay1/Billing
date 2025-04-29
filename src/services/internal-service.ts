import { ActiveMerchants, MerchantAttributes } from "../models/merchant";

export class InternalService {
    static async createActiveMerchant(data: MerchantAttributes): Promise<boolean> {
        try {
            await ActiveMerchants.create({ ...data });
            return true
        } catch (e) { return false }
    }
}