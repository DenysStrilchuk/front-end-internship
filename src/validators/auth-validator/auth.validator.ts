import Joi from 'joi';

export const registrationValidationSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.empty': 'auth.errors.email.empty',
      'string.email': 'auth.errors.email.invalid',
      'any.required': 'auth.errors.email.required',
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).{8,30}$'))
    .required()
    .messages({
      'string.empty': 'auth.errors.password.empty',
      'string.min': 'auth.errors.password.min',
      'string.max': 'auth.errors.password.max',
      'string.pattern.base': 'auth.errors.password.pattern',
      'any.required': 'auth.errors.password.required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'auth.errors.confirmPassword.match',
      'any.required': 'auth.errors.confirmPassword.required',
    }),
  firstName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[A-Z][a-z]+$/)
    .required()
    .messages({
      'string.empty': 'auth.errors.firstName.empty',
      'string.min': 'auth.errors.firstName.min',
      'string.max': 'auth.errors.firstName.max',
      'string.pattern.base': 'auth.errors.firstName.pattern',
      'any.required': 'auth.errors.firstName.required',
    }),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[A-Z][a-z]+$/)
    .required()
    .messages({
      'string.empty': 'auth.errors.lastName.empty',
      'string.min': 'auth.errors.lastName.min',
      'string.max': 'auth.errors.lastName.max',
      'string.pattern.base': 'auth.errors.lastName.pattern',
      'any.required': 'auth.errors.lastName.required',
    }),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.empty': 'auth.errors.email.empty',
      'string.email': 'auth.errors.email.invalid',
      'any.required': 'auth.errors.email.required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'auth.errors.password.required',
    }),
});
