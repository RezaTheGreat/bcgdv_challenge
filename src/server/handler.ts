import { Context } from 'koa';
import { watchPriceList } from '../config';
import { getInvoiceTotal } from '../logic/invoice';
import { orderValidationSchema } from './validation';

export function handleRequest(ctx: Context) {
  // restricting method type to POST
  if (ctx.method !== 'POST') {
    ctx.throw(405, 'Method Not allowed');
  }
  // forcing the headers to be present
  const { accept } = ctx.headers;
  const acceptHeaderValues = ['application/json', '*/*'];

  if (ctx.headers['content-type'] !== 'application/json' || !acceptHeaderValues.includes(accept as string)) {
    ctx.throw(400, 'Bad headers set');
  }

  //validate the body
  const validationResult = orderValidationSchema.validate(ctx.request.body);
  const { error, value } = validationResult;
  if (error) {
    ctx.throw(400, error);
  }

  //calculate the price against the watch price list
  ctx.body = { price: getInvoiceTotal(value, watchPriceList) };
}
