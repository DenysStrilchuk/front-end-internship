import Joi from "joi";

export const companyUpdateValidationSchema = Joi.object({
  company_name: Joi.string()
    .min(2)
    .max(100)
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/)
    .required()
    .messages({
      'string.empty': 'validation.companyName.required',
      'string.min': 'validation.companyName.min',
      'string.max': 'validation.companyName.max',
      'string.pattern.base': 'validation.companyName.pattern',
    }),
  company_description: Joi.string()
    .max(500)
    .regex(/^(?!^\d+$).*$/)
    .allow('')
    .optional()
    .messages({
      'string.max': 'validation.companyDescription.max',
      'string.pattern.base': 'validation.companyDescription.pattern',
    }),
  company_city: Joi.string()
    .max(100)
    .regex(/^(?=.*[A-Za-z])[A-Za-z\s]+$/)
    .allow('')
    .optional()
    .messages({
      'string.max': 'validation.companyCity.max',
      'string.pattern.base': 'validation.companyCity.pattern',
    }),
  company_phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'validation.companyPhone.invalid',
    }),
  company_links: Joi.array()
    .items(Joi.string().uri().message('validation.companyLinks.invalidUrl'))
    .optional()
    .messages({
      'array.includes': 'validation.companyLinks.invalid',
    }),
});
