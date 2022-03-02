import Joi from 'joi';
import { watchPriceList } from '../config';

export const orderValidationSchema = Joi.array()
  .items(Joi.string().valid(...watchPriceList.keys()))
  .required();
