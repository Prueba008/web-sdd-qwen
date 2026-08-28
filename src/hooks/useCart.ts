import { useCallback, useEffect, useRef, useState } from "react";
import type { CartItem, Product, ToastMsg, Weight } from "../types";
import { products } from "../data/products";
import { priceForWeight } from "../lib/format";

const CART_KEY = "cafe-obscura-cart";

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => products.some((p) => p.id === i.productId)) : [];
  } catch {
    return [];
  }
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [badgeBump, setBadgeBump] = useState(0);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cart]);

  const pushToast = useCallback((text: string, kind: ToastMsg["kind"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, text, kind }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const addToCart = useCallback(
    (product: Product, weight: Weight = 250, grind: string = "En grano", qty: number = 1) => {
      const key = `${product.id}|${weight}|${grind}`;
      setCart((prev) => {
        const found = prev.find((i) => i.key === key);
        if (found) {
          return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(12, i.qty + qty) } : i));
        }
        return [...prev, { key, productId: product.id, weight, grind, qty }];
      });
      setBadgeBump((b) => b + 1);
      pushToast(`${product.name} (${weight === 250 ? "250 g" : "1 kg"}) añadido al carrito.`);
    },
    [pushToast]
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.min(12, Math.max(1, i.qty + delta)) } : i))
    );
  }, []);

  const removeItem = useCallback(
    (key: string) => {
      setCart((prev) => prev.filter((i) => i.key !== key));
      pushToast("Producto retirado del carrito.", "info");
    },
    [pushToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return {
    cart,
    badgeBump,
    toasts,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    pushToast,
    dismissToast,
  };
}
