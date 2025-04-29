import Joi from "joi";

export const billDetails = Joi.object(
    {
        merchant_id: Joi.string().required(),
        bill_code: Joi.string().required(),
    }
)

export const deleteBill = Joi.object(
    {
        bill_id: Joi.string().required(),
    }
)