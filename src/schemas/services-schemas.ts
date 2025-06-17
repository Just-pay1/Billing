import Joi from "joi";

export const create = Joi.object(
    {
        service_type: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    }
)