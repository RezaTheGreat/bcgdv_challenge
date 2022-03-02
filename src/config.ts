import { Inventory } from './logic/types';

export const watchPriceList: Inventory = new Map([
  ['001', { name: 'Rolex', basePrice: 100, discount: { discountPrice: 200, minimumDiscountQuantity: 3 } }],
  ['002', { name: 'Michael Kors', basePrice: 80, discount: { discountPrice: 120, minimumDiscountQuantity: 2 } }],
  ['003', { name: 'Swatch', basePrice: 50 }],
  ['004', { name: 'Casio', basePrice: 30 }],
]);

export const serverPort = 8098;
