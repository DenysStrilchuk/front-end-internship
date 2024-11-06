import Joi from "joi";

export const userUpdateValidationSchema = Joi.object({
    user_firstname: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Z][a-z]+$/)
        .required()
        .messages({
            'string.empty': 'validation.firstName.required',
            'string.min': 'validation.firstName.min',
            'string.max': 'validation.firstName.max',
            'string.pattern.base': 'validation.firstName.pattern',
        }),
    user_lastname: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Z][a-z]+$/)
        .required()
        .messages({
            'string.empty': 'validation.lastName.required',
            'string.min': 'validation.lastName.min',
            'string.max': 'validation.lastName.max',
            'string.pattern.base': 'validation.lastName.pattern',
        }),
    user_city: Joi.string()
        .optional()
        .allow('')
        .max(100)
        .messages({
            'string.max': 'validation.city.max',
        }),
    user_phone: Joi.string()
        .pattern(/^\+?[0-9]{7,15}$/)
        .messages({
            'string.pattern.base': 'validation.phone.invalid',
        }),
});