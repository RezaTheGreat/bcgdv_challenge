import { getInvoiceItemPrice } from './prices';
import { Inventory } from './types';

export function getInvoiceItems(ids: string[]) {
  if (ids.length === 0) {
    throw new Error('Invalid invoice items list');
  }
  return ids.reduce((allItems: any, id: string) => {
    if (id in allItems) {
      allItems[id]++;
    } else {
      allItems[id] = 1;
    }
    return allItems;
  }, {});
}

export function getInvoiceTotal(rawInvoice: string[], priceList: Inventory) {
  //getting the invoice normalized as an object
  if (priceList.size === 0) {
    throw new Error('Invalid price list');
  }
  const orderItems = getInvoiceItems(rawInvoice);
  let invoiceTotal = 0;
  for (const [id, quantity] of Object.entries(orderItems)) {
    invoiceTotal += getInvoiceItemPrice(priceList, id, quantity as number);
  }
  return invoiceTotal;
}
