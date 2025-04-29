import { Bill } from "../models/bill";
import { ElectricBill } from "../models/externals/electricalBills";
import { ActiveMerchants } from "../models/merchant";
import { WebError } from "../utilities/web-errors";

export class BillService {

    public async getElectricBill(merchant_id: string, bill_code: string) {
        // check if the merchant is correct 
        const merchant = await ActiveMerchants.findByPk(merchant_id);
        if (!merchant) {
            throw WebError.BadRequest(`merchant_id is invalid, please review`);
        }

        // get the bill and save it to our db
        const electricalBill = await ElectricBill.findOne({ where: { bill_code } });

        if (!electricalBill) {
            throw WebError.BadRequest(`merchant_id is invalid, please review`);
        }

        // create and return the new bill 
        const bill = await Bill.create({
            bill_id: electricalBill.dataValues.bill_id,
            bill_code: electricalBill.dataValues.bill_code,
            merchant_id,
            amount: Number(electricalBill.dataValues.amount),
            due_date: electricalBill.dataValues.due_date,
            issue_date: electricalBill.dataValues.issue_date,
            status: electricalBill.dataValues.status,
            payment_date: null,
            payment_method: null,
            user_id: null,
        })

        return bill.dataValues
    }

    public async deleteBill(bill_id: string) {
        const bill = await Bill.findByPk(bill_id);

        if(!bill) {
            throw WebError.BadRequest(`bill_id is invalid, please review`);
        }

        await Bill.destroy({ where: { bill_id } })

        return true
    }

}