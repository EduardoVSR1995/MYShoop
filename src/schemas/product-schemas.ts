import Joi from "joi";

export type cardUserSchema = {
  id: number,
  quantiti: number
}
export type fretSchema = {
  sCepDestino: string,
  quantiti: number,
  id: number
}

export const creatUserSchema = Joi.object<cardUserSchema>({
  id: Joi.number().required(),
  quantiti: Joi.number().required(),
});

export const fretUserSchema = Joi.object<fretSchema>({
  sCepDestino: Joi.string().min(8).max(8).required(),
  quantiti: Joi.number().invalid(0).required(),
  id: Joi.number().required(),
});
