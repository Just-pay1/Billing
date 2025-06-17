import Joi from "joi";

export const internal = {
    merchantTransactions: Joi.object({
        merchant_id: Joi.string().required(),
        page: Joi.number().integer().min(-1).default(-1).optional(),
        limit: Joi.number().integer().min(1).default(10).optional()
    })
}