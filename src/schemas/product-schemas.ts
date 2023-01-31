import Joi from "joi";

export type cardUserSchema = {
    id: number,
    quantiti: number
}

export const creatUserSchema = Joi.object<cardUserSchema>({
  id: Joi.number().required(),
  quantiti: Joi.number().required(),
});
