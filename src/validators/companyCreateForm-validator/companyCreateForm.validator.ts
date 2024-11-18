import Joi from "joi";

export const schema = Joi.object({
    company_name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Z][A-Za-z\s]*$/)
        .pattern(/^(?!^\d+$).*$/)
        .messages({
            "string.empty": 'createCompany.validation.emptyName',
            "string.min": 'createCompany.validation.minLength',
            "string.max": 'createCompany.validation.maxLength',
            "any.required": 'createCompany.validation.required',
            "string.pattern.base": 'createCompany.validation.invalidName'
        }),
    is_visible: Joi.boolean()
});
