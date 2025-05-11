import Joi from "joi";

export const billDetails = Joi.object(
    {
        merchant_id: Joi.string().required(),
        bill_code: Joi.string().required(),
    }
)

export const billDetailsViaID = Joi.object(
    {
        bill_id: Joi.string().required(),
    }
)

export const updateBillStatus = Joi.object(
    {
        bill_id: Joi.string().required(),
        user_id: Joi.string().required(),
        paid_amount: Joi.number().required(),
        // payment_method: Joi.valid('credit', 'debit', 'prepaid').required()
    }
)