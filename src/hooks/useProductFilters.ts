import { useMemo, useState } from "react";
import type { CategoryFilter, Product, SortKey } from "../types";
import { products, CATEGORY_LABELS } from "../data/products";

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "origen", label: CATEGORY_LABELS.origen },
  { value: "blend", label: CATEGORY_LABELS.blend },
  { value: "descafeinado", label: CATEGORY_LABELS.descafeinado },
];

export function useProductFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [loading, setLoading] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [p.name, p.origin, p.description, CATEGORY_LABELS[p.category], ...p.notes]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast-asc":
        list = [...list].sort((a, b) => a.roast - b.roast);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    loading,
    setLoading,
    filtered,
    countByCategory,
    resetFilters,
    FILTERS,
  };
}
