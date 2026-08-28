import { useMemo } from "react";
import type { CartItem, Product, Weight } from "../../../types";
import { priceForWeight } from "../../../lib/format";
import { products, FREE_SHIPPING_FROM, SHIPPING_COST } from "../../../data/products";

export interface EnrichedItem extends CartItem {
  product: Product;
  unitPrice: number;
}

export function useCartCalculations(cart: CartItem[]) {
  const items: EnrichedItem[] = useMemo(
    () =>
      cart
        .map((i) => {
          const product = products.find((p) => p.id === i.productId)!;
          return { ...i, product, unitPrice: priceForWeight(product.price, i.weight) };
        })
        .filter((i) => i.product),
    [cart]
  );

  const cartCount = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + i.unitPrice * i.qty, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const freeShipping = subtotal >= FREE_SHIPPING_FROM;
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM);

  return {
    items,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShipping,
    missing,
    progress,
  };
}
