export type Inventory = Map<string, Product>;

export interface Product {
  name: string;
  basePrice: number;
  discount?: DiscountRule;
}

export interface DiscountRule {
  minimumDiscountQuantity: number;
  discountPrice: number;
}
