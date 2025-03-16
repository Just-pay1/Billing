import Joi from 'joi';

export const getBillSchema = Joi.object({
  company_id: Joi.string().pattern(/^\d+$/).required().messages({
    'string.empty': 'Company ID cannot be empty',
    'string.pattern.base': 'Company ID must be a numeric string',
    'any.required': 'Company ID is required'
  }),
  user_id: Joi.string().pattern(/^\d+$/).required().messages({
    'string.empty': 'User ID cannot be empty',
    'string.pattern.base': 'User ID must be a numeric string',
    'any.required': 'User ID is required'
  }),
});