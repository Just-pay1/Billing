import { Bill } from "../models/bill";
import { ActiveMerchants, MerchantAttributes } from "../models/merchant";
import { WebError } from "../utilities/web-errors";

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

    async listFailedTransactions(merchant_id: string, page: number, limit: number) {
        const offset = (page - 1) * limit;
        let where: any = {
            merchant_id,
            status: 'failed'
        }

        const merchant = await ActiveMerchants.findByPk(merchant_id);
        if (!merchant) {
            throw WebError.BadRequest('invalid merchant_id, please review.');
        }

        if (page != -1) {
            where = {
                offset,
                limit,
                merchant_id,
                status: 'failed'
            }
        }

        const { count, rows } = await Bill.findAndCountAll(where);
        const response = {
            count,
            activePage: page,
            rows
        }
        return response

    }

    async listSuccessfulTransactions(merchant_id: string, page: number, limit: number) {
        const offset = (page - 1) * limit;
        let where: any = {
            merchant_id,
            status: 'paid'
        }

        const merchant = await ActiveMerchants.findByPk(merchant_id);
        if (!merchant) {
            throw WebError.BadRequest('invalid merchant_id, please review.');
        }

        if (page != -1) {
            where = {
                offset,
                limit,
                merchant_id,
                status: 'paid'
            }
        }

        const { count, rows } = await Bill.findAndCountAll(where);
        const response = {
            count,
            activePage: page,
            rows
        }
        return response   
    }

}