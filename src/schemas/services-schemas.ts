import Joi from "joi";

export const list = Joi.object(
    {
        page: Joi.string().pattern(/^(?:0|[1-9][0-9]*|-1)$/).required(),
        limit: Joi.string().pattern(/^\d+$/).optional(),
    }
)

export const create = Joi.object(
    {
        service_type: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    }
)