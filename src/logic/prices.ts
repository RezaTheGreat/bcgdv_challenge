import { DiscountRule, Inventory, Product } from './types';

export function calculateDiscountedPrice(basePrice: number, discountRule: DiscountRule, quantity: number) {
  const { minimumDiscountQuantity, discountPrice } = discountRule;

  const discountedItemsCount = Math.trunc(quantity / minimumDiscountQuantity);
  const basePricedItemsCount = quantity % minimumDiscountQuantity;

  // disabled prettier for next line to improve readability by having parenthesis
  // eslint-disable-next-line prettier/prettier
  return (basePrice * basePricedItemsCount) + (discountPrice * discountedItemsCount);
}

export function getInvoiceItemPrice(products: Inventory, id: string, quantity: number) {
  // checking the product id to be present
  if (!products.has(id)) {
    throw new Error(`the product Id ${id} is not found`);
  }

  //checking if the quantity is correct (more than 1)
  if (quantity < 1) {
    throw new Error(`the order quantity ${quantity} is not valid`);
  }

  // we thrown the exception of not present product so we know that the type is not undefined
  const { basePrice, discount } = products.get(id) as Product;

  if (!discount) {
    return quantity * basePrice;
  }

  return calculateDiscountedPrice(basePrice, discount, quantity);
}
