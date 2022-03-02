import { calculateDiscountedPrice, getInvoiceItemPrice } from './prices';
import { Inventory } from './types';

describe('testing the prices calculator', () => {
  const testInventory: Inventory = new Map([
    ['1', { name: 'test item 1', basePrice: 100, discount: { discountPrice: 200, minimumDiscountQuantity: 3 } }],
    ['a1', { name: 'test item a1', basePrice: 300, discount: { discountPrice: 800, minimumDiscountQuantity: 3 } }],
    ['e3', { name: 'test item e', basePrice: 300, discount: { discountPrice: 800, minimumDiscountQuantity: 3 } }],
    ['c1', { name: 'test item c1', basePrice: 300 }],
    ['88', { name: 'test item 88', basePrice: 4580 }],
  ]);
  it('should calculate the discounted price correctly', () => {
    expect(calculateDiscountedPrice(100, { discountPrice: 150, minimumDiscountQuantity: 2 }, 5)).toEqual(400);
    expect(calculateDiscountedPrice(120, { discountPrice: 200, minimumDiscountQuantity: 2 }, 5)).toEqual(520);
    expect(calculateDiscountedPrice(500, { discountPrice: 700, minimumDiscountQuantity: 2 }, 5)).toEqual(1900);
  });

  it('should calculate the discounted price correctly from inventory map', () => {
    expect(getInvoiceItemPrice(testInventory, '1', 4)).toEqual(300);
    expect(getInvoiceItemPrice(testInventory, 'e3', 20)).toEqual(5400);
    expect(getInvoiceItemPrice(testInventory, '88', 3)).toEqual(13740);
  });

  it('should calculate the non discounted price correctly from inventory map', () => {
    expect(getInvoiceItemPrice(testInventory, 'c1', 50)).toEqual(15000);
  });

  it('should throw on invalid quantity', () => {
    expect(() => {
      getInvoiceItemPrice(testInventory, 'a1', 0);
    }).toThrow('the order quantity 0 is not valid');
  });

  it('should throw on invalid product id', () => {
    expect(() => {
      getInvoiceItemPrice(testInventory, 'x', 0);
    }).toThrow('the product Id x is not found');
  });
});
