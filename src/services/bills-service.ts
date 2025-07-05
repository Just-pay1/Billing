import { external_db } from "../db/external";
import { Bill } from "../models/bill";
import { ElectricBill } from "../models/externals/electricalBills";
import { GasBill } from "../models/externals/gasBills";
import { InternetBill } from "../models/externals/internetBills";
import { WaterBill } from "../models/externals/waterBills";
import { ActiveMerchants } from "../models/merchant";
import { calcFee } from "../utilities/calcFees";
import { makeRequest } from "../utilities/makeInternalRequest";
import { WebError } from "../utilities/web-errors";

export class BillService {

    public async getBill(service_id: string, merchant_id: string, bill_code: string) {
        const merchant = await ActiveMerchants.findByPk(merchant_id);
        if (!merchant) {
            throw WebError.BadRequest(`merchant_id is invalid, please review`);
        }
        const service = await makeRequest({
            method: 'post',
            service: 'crm',
            path: '/services/get-service',
            context: { service_id }
        })

        // console.log(merchant.dataValues)

        // console.log(service)

        if (!service) {
            throw WebError.BadRequest(`service_id is invalid, please review`);
        }

        if (merchant.dataValues.service_id !== service.id) {
            throw WebError.BadRequest(`service_id is not valid for this merchant, please review`);
        }

        // check for the service type and call the appropriate model 
        const { bill, model, category } = await this.getBillBYItsType(service.service_type, bill_code);
        if (!bill) {
            throw WebError.BadRequest(`There is no pending bill with this bill_code, please review`);
        }
        // after retrieving the bill calc fees and save the bill and its details to our db 
        const { fee, total_amount } = calcFee(merchant.dataValues.commission_setup, +merchant.dataValues.commission_amount, +bill.dataValues.amount, merchant.dataValues.fee_from)

        // create and return the new bill 
        const newBill = await Bill.create({
            bill_id: bill.dataValues.bill_id,
            bill_code: bill.dataValues.bill_code,
            merchant_id,
            amount: Number(bill.dataValues.amount),
            fee,
            due_date: bill.dataValues.due_date,
            issue_date: bill.dataValues.issue_date,
            status: bill.dataValues.status,
            payment_date: null,
            // payment_method: null,bill
            user_id: null,
            model
        })

        // then return the bill derails with the total amount
        return { ...newBill.dataValues, total_amount, category }
 


    }

    // public async getElectricBill(merchant_id: string, bill_code: string) {
    //     // check if the merchant is correct 
    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     console.log(merchant?.dataValues)
    //     if (!merchant) {
    //         throw WebError.BadRequest(`merchant_id is invalid, please review`);
    //     }

    //     // get the bill and save it to our db
    //     const electricalBill = await ElectricBill.findOne({ where: { bill_code } });

    //     if (!electricalBill) {
    //         throw WebError.BadRequest(`bill_code is invalid, please review`);
    //     }

    //     const { fee, total_amount } = calcFee(merchant.dataValues.commission_setup, +merchant.dataValues.commission_amount, +electricalBill.dataValues.amount, merchant.dataValues.fee_from)

    //     // create and return the new bill 
    //     const bill = await Bill.create({
    //         bill_id: electricalBill.dataValues.bill_id,
    //         bill_code: electricalBill.dataValues.bill_code,
    //         merchant_id,
    //         amount: Number(electricalBill.dataValues.amount),
    //         fee,
    //         due_date: electricalBill.dataValues.due_date,
    //         issue_date: electricalBill.dataValues.issue_date,
    //         status: electricalBill.dataValues.status,
    //         payment_date: null,
    //         // payment_method: null,
    //         user_id: null,
    //         model: 'ElectricBill'
    //     })

    //     return { ...bill.dataValues, total_amount }
    // }

    // public async getWaterBill(merchant_id: string, bill_code: string) {
    //     // check if the merchant is correct 
    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     if (!merchant) {
    //         throw WebError.BadRequest(`merchant_id is invalid, please review`);
    //     }

    //     // get the bill and save it to our db
    //     const waterBill = await WaterBill.findOne({ where: { bill_code } });

    //     if (!waterBill) {
    //         throw WebError.BadRequest(`bill_code is invalid, please review`);
    //     }

    //     const { fee, total_amount } = calcFee(merchant.dataValues.commission_setup, +merchant.dataValues.commission_amount, +waterBill.dataValues.amount, merchant.dataValues.fee_from)


    //     // create and return the new bill 
    //     const bill = await Bill.create({
    //         bill_id: waterBill.dataValues.bill_id,
    //         bill_code: waterBill.dataValues.bill_code,
    //         merchant_id,
    //         amount: Number(waterBill.dataValues.amount),
    //         fee,
    //         due_date: waterBill.dataValues.due_date,
    //         issue_date: waterBill.dataValues.issue_date,
    //         status: waterBill.dataValues.status,
    //         payment_date: null,
    //         // payment_method: null,
    //         user_id: null,
    //         model: 'WaterBill'
    //     })

    //     return { ...bill.dataValues, total_amount }
    // }

    // public async getGasBill(merchant_id: string, bill_code: string) {
    //     // check if the merchant is correct 
    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     if (!merchant) {
    //         throw WebError.BadRequest(`merchant_id is invalid, please review`);
    //     }

    //     // get the bill and save it to our db
    //     const gasBill = await GasBill.findOne({ where: { bill_code } });

    //     if (!gasBill) {
    //         throw WebError.BadRequest(`bill_code is invalid, please review`);
    //     }

    //     const { fee, total_amount } = calcFee(merchant.dataValues.commission_setup, +merchant.dataValues.commission_amount, +gasBill.dataValues.amount, merchant.dataValues.fee_from)


    //     // create and return the new bill 
    //     const bill = await Bill.create({
    //         bill_id: gasBill.dataValues.bill_id,
    //         bill_code: gasBill.dataValues.bill_code,
    //         merchant_id,
    //         amount: Number(gasBill.dataValues.amount),
    //         fee,
    //         due_date: gasBill.dataValues.due_date,
    //         issue_date: gasBill.dataValues.issue_date,
    //         status: gasBill.dataValues.status,
    //         payment_date: null,
    //         // payment_method: null,
    //         user_id: null,
    //         model: 'GasBill'
    //     })

    //     return { ...bill.dataValues, total_amount }
    // }

    // public async getInternetBill(merchant_id: string, bill_code: string) {
    //     // check if the merchant is correct 
    //     const merchant = await ActiveMerchants.findByPk(merchant_id);
    //     if (!merchant) {
    //         throw WebError.BadRequest(`merchant_id is invalid, please review`);
    //     }

    //     // get the bill and save it to our db
    //     const internetBill = await external_db.models.InternetBill.findOne({ where: { bill_code } });

    //     if (!internetBill) {
    //         throw WebError.BadRequest(`bill_code is invalid, please review`);
    //     }

    //     const { fee, total_amount } = calcFee(merchant.dataValues.commission_setup, +merchant.dataValues.commission_amount, +internetBill.dataValues.amount, merchant.dataValues.fee_from)

    //     // create and return the new bill 
    //     const bill = await Bill.create({
    //         bill_id: internetBill.dataValues.bill_id,
    //         bill_code: internetBill.dataValues.bill_code,
    //         merchant_id,
    //         amount: Number(internetBill.dataValues.amount),
    //         fee,
    //         due_date: internetBill.dataValues.due_date,
    //         issue_date: internetBill.dataValues.issue_date,
    //         status: internetBill.dataValues.status,
    //         payment_date: null,
    //         // payment_method: null,
    //         user_id: null,
    //         model: 'GasBill'
    //     })

    //     return { ...bill.dataValues, total_amount }
    // }

    private async getBillBYItsType(service_type: string, bill_code: string): Promise<any | null> {
        if (service_type.includes('electric') || service_type.includes('electricity')) {
            const bill = await ElectricBill.findOne({ where: { bill_code, status: "pending" } });
            return { bill, model: 'ElectricBill', category: 'electric_bill' }
        }

        if (service_type.includes('gas')) {
            const bill = await GasBill.findOne({ where: { bill_code, status: "pending" } });
            return { bill, model: 'GasBill', category: 'gas_bill' }

        }

        if (service_type.includes('water')) {
            const bill =  await WaterBill.findOne({ where: { bill_code, status: "pending" } });
            return { bill, model: 'WaterBill', category: 'water_bill' }
        }

        if (service_type.includes('internet')) {
            const bill = await InternetBill.findOne({ where: { bill_code, status: "pending" } });
            return { bill, model: 'InternetBill', category: 'internet_bill' }   
        }

        return null;
    }

    public async deleteBill(bill_id: string) {
        const bill = await Bill.findByPk(bill_id);

        if (!bill) {
            throw WebError.BadRequest(`bill_id is invalid, please review`);
        }

        await Bill.destroy({ where: { bill_id } })

        return true
    }

    // internal
    public async getBillDetails(bill_id: string) {
        const bill = await Bill.findByPk(bill_id, {
            include: [{
                model: ActiveMerchants,
                as: 'merchant',
            }]
        });

        if (!bill) {
            throw WebError.BadRequest(`bill_id is invalid, please review`);
        }

        return bill.dataValues
    }

    public async updateBillStatus(bill_id: string, user_id: string, paid_amount: number) {
        const bill = await Bill.findByPk(bill_id, {
            include: [{
                model: ActiveMerchants,
                as: 'merchant'
            }]
        });

        if (!bill) {
            throw WebError.BadRequest(`bill_id is invalid, please review`);
        }

        if (bill.dataValues.status === "paid") {
            throw WebError.BadRequest(`This bill is already paid, please review`);
        }


        try {
            const modelName = bill.dataValues.model
            const model = external_db.models[modelName];
            await model.update({
                status: 'paid',
                payment_date: new Date
            },
                {
                    where: {
                        bill_code: bill.dataValues.bill_code
                    }
                }
            )

            await bill.update({
                status: 'paid',
                payment_date: new Date,
                user_id,
                paid_amount
            })
        } catch (error) {
            console.error('Transaction failed:', error);
            throw WebError.InternalServerError(`couldn't update bill status due to ${error}, please review`)
        }

        return true


    }

}