import { ActiveMerchants, MerchantAttributes } from "../models/merchant";

export class InternalService {
    static async createActiveMerchant(data: MerchantAttributes): Promise<boolean> {
        try {
            console.log(data)
            const newMerchant = await ActiveMerchants.create({ ...data });
            console.log(newMerchant.dataValues)
            return true
        } catch (e) {
            console.log(e)
            return false 
        }
    }
}