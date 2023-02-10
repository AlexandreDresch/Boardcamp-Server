import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().min(10).max(11),
    cpf: Joi.string().required().length(11),
    birthday: Joi.date().raw().required(),
});