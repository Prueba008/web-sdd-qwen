export type Category = "origen" | "blend" | "descafeinado";

export type CategoryFilter = Category | "all";

export type Weight = 250 | 1000;

export interface Product {
  id: string;
  name: string;
  origin: string;
  category: Category;
  roast: 1 | 2 | 3 | 4 | 5;
  price: number; // 250 g
  notes: string[];
  description: string;
  process: string;
  altitude: string;
  variety: string;
  image: string;
  accent: string;
}

export interface CartItem {
  key: string;
  productId: string;
  weight: Weight;
  grind: string;
  qty: number;
}

export interface ToastMsg {
  id: number;
  text: string;
  kind: "success" | "info";
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "roast-asc";
