import Joi from "joi";
import PasswordUtils from "../utils/password.js";
import config from "../config/environment.js";

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no maximo 50 caracteres',
      'any.required': 'Nome e obrigatorio'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email deve ter um formato valido',
      'any.required': 'Email e obrigatorio'
    }),

  password: Joi.string()
    .min(config.security.password.minLength)
    .custom((value, helpers) => {
      const validation = PasswordUtils.validatePasswordStrength(value);
      if (!validation.isValid) {
        return helpers.error('password.weak', { issues: validation.issues });
      }
      return value;
    })
    .required()
    .messages({
      'string.min': `Senha deve ter pelo menos ${config.security.password.minLength} caracteres`,
      'any.required': 'Senha e obrigatoria',
      'password.weak': 'Senha muito fraca. {{#issues}}'
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email deve ter um formato valido',
      'any.required': 'Email e obrigatorio'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Senha e obrigatoria'
    })
});

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: true,
        message: 'Dados invalidos',
        errors
      });
    }

    req.body = value;
    next();
  };
};

export const validateRegister = validate(registerSchema);
export const validateLogin =  validate(loginSchema);