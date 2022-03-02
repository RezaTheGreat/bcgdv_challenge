import { getInvoiceItems, getInvoiceTotal } from './invoice';
import { Inventory } from './types';

describe('testing the invoice functions', () => {
  const testInventory: Inventory = new Map([
    ['1', { name: 'test item 1', basePrice: 100, discount: { discountPrice: 200, minimumDiscountQuantity: 3 } }],
    ['a1', { name: 'test item a1', basePrice: 300, discount: { discountPrice: 800, minimumDiscountQuantity: 3 } }],
    ['e3', { name: 'test item e', basePrice: 300, discount: { discountPrice: 800, minimumDiscountQuantity: 3 } }],
    ['c1', { name: 'test item c1', basePrice: 300 }],
    ['88', { name: 'test item 88', basePrice: 4580 }],
  ]);

  it('should return invoice items based on id occurrence', () => {
    expect(getInvoiceItems(['45', '45', '88', '2', '3', '5', '88', '2'])).toEqual({ '45': 2, '88': 2, '2': 2, '3': 1, '5': 1 });
  });

  it('should throw on empty invoice items', () => {
    expect(() => {
      getInvoiceItems([]);
    }).toThrow('Invalid invoice items list');
  });

  it('should return the invoice total based on given price list', () => {
    expect(getInvoiceTotal(['1', '1', 'e3', '1', '88', 'c1', 'a1', 'e3', 'e3', 'e3'], testInventory)).toEqual(6480);
  });

  it('should throw on empty price list', () => {
    expect(() => {
      getInvoiceTotal(['1', 'e3'], new Map());
    }).toThrow('Invalid price list');
  });
});
