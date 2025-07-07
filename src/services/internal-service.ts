import { Bill } from "../models/bill";
import { ActiveMerchants, MerchantAttributes } from "../models/merchant";
import { WebError } from "../utilities/web-errors";

export class InternalService {
    static async createActiveMerchant(data: MerchantAttributes): Promise<boolean> {
        try {
            console.log(data)
            const newMerchant = await ActiveMerchants.create({ ...data });
            console.log(`Merchant with legal name of ${newMerchant.dataValues.legal_name} has created`)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    // async listFailedTransactions(merchant_id: string, page: number, limit: number) {
    //     const offset = (page - 1) * limit;
    //     let where: any = {
    //         merchant_id,
    //         status: 'failed'
    //     }

    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     if (!merchant) {
    //         throw WebError.BadRequest('invalid merchant_id, please review.');
    //     }

    //     if (page != -1) {
    //         where = {
    //             offset,
    //             limit,
    //             merchant_id,
    //             status: 'failed'
    //         }
    //     }

    //     const { count, rows } = await Bill.findAndCountAll(where);
    //     const response = {
    //         count,
    //         activePage: page,
    //         rows
    //     }
    //     return response

    // }

    // async listSuccessfulTransactions(merchant_id: string, page: number, limit: number) {
    //     const offset = (page - 1) * limit;
    //     let where: any = {
    //         merchant_id,
    //         status: 'paid'
    //     }

    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     if (!merchant) {
    //         throw WebError.BadRequest('invalid merchant_id, please review.');
    //     }

    //     if (page != -1) {
    //         where = {
    //             offset,
    //             limit,
    //             merchant_id,
    //             status: 'paid'
    //         }
    //     }

    //     const { count, rows } = await Bill.findAndCountAll(where);
    //     const response = {
    //         count,
    //         activePage: page,
    //         rows
    //     }
    //     return response   
    // }


    async ALLTransactions(merchant_id: string, page: number, limit: number) {
        const merchant = await ActiveMerchants.findByPk(merchant_id);
        if (!merchant) {
            throw WebError.BadRequest('invalid merchant_id, please review.');
        }
    
        const whereClause = {
            merchant_id,
        };
    
        let queryOptions: any = { where: whereClause };
        
        // Apply pagination only if page is not -1
        if (page !== -1) {
            const offset = (page - 1) * limit;
            queryOptions.offset = offset;
            queryOptions.limit = limit;
        }
    
        const { count, rows } = await Bill.findAndCountAll(queryOptions);
        
        return {
            count,
            activePage: page === -1 ? null : page, // or handle -1 case appropriately
            rows
        };
    }

}