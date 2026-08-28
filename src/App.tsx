import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, CategoryFilter, Product, SortKey, ToastMsg, Weight } from "./types";
import { CATEGORY_LABELS, FREE_SHIPPING_FROM, SHIPPING_COST, products } from "./data/products";
import { priceForWeight } from "./lib/format";
import Header from "./components/Header";
import Masthead from "./components/Masthead";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type EnrichedItem } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Toasts from "./components/Toasts";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { BeanIcon, ChevronDownIcon, SearchIcon, XIcon } from "./components/Icons";

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

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "origen", label: CATEGORY_LABELS.origen },
  { value: "blend", label: CATEGORY_LABELS.blend },
  { value: "descafeinado", label: CATEGORY_LABELS.descafeinado },
];

const RITUAL = [
  {
    n: "01",
    title: "Tostamos al pedido",
    text: "Tu bolsa entra al tostador después de tu compra, nunca antes. Lotes de 12 kg, perfil afinado a mano.",
  },
  {
    n: "02",
    title: "Reposo de 48 horas",
    text: "Dejamos desgasificar el grano lo justo para que la taza llegue estable, dulce y sin asperezas.",
  },
  {
    n: "03",
    title: "Viaja en 72 horas",
    text: "Empaque con válvula y fecha de tueste impresa. Sale de la barra a tu puerta antes de perder el aroma.",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [badgeBump, setBadgeBump] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const catalogRef = useRef<HTMLDivElement>(null);
  const toastId = useRef(0);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 750);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cart]);

  const overlayOpen = cartOpen || detail !== null || checkoutOpen;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

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

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  const handleCheckoutComplete = () => {
    setCheckoutOpen(false);
    setCartOpen(false);
    setCart([]);
    pushToast("¡Gracias! Tu pedido quedó confirmado (simulación).", "success");
  };

  return (
    <div className="min-h-screen bg-espresso-900 text-crema-100">
      <div className="noise-overlay" aria-hidden="true" />

      <Header
        query={query}
        onQuery={setQuery}
        cartCount={cartCount}
        badgeKey={badgeBump}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <Masthead onExplore={scrollToCatalog} />

        {/* ─── La barra ─── */}
        <div ref={catalogRef} className="scroll-mt-24">
          <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-caramel-400">
                  <span className="h-px w-10 bg-caramel-500/70" />
                  Catálogo · semana del tueste 214
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-crema-50 sm:text-5xl">
                  La barra de <em className="font-light italic text-caramel-400">la semana</em>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-crema-400">
                Cada bolsa sale con fecha de tueste impresa. Cuando un lote se acaba, se acabó hasta la
                próxima cosecha.
              </p>
            </Reveal>

            {/* controles */}
            <Reveal delay={100} className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
                {FILTERS.map((f) => {
                  const active = category === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setCategory(f.value)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                        active
                          ? "border-caramel-500 bg-caramel-500 text-espresso-950 shadow-[0_8px_24px_-8px_rgba(217,142,50,0.6)]"
                          : "border-espresso-600 text-crema-300 hover:border-caramel-500/60 hover:text-caramel-300"
                      }`}
                    >
                      {f.label}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          active ? "bg-espresso-950/20 text-espresso-950" : "bg-espresso-700 text-crema-400"
                        }`}
                      >
                        {countByCategory[f.value] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm text-crema-500" aria-live="polite">
                  <span className="font-bold text-crema-200">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "café" : "cafés"}
                </p>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    aria-label="Ordenar cafés"
                    className="appearance-none rounded-full border border-espresso-600 bg-espresso-850 py-2 pl-4 pr-9 text-sm font-semibold text-crema-200 transition hover:border-caramel-500/60 focus:border-caramel-500"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Precio · menor a mayor</option>
                    <option value="price-desc">Precio · mayor a menor</option>
                    <option value="roast-asc">Tueste · claro a oscuro</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-crema-400" />
                </div>
              </div>
            </Reveal>

            {query.trim() && (
              <p className="mt-4 flex items-center gap-2 text-sm text-crema-400">
                <SearchIcon className="text-caramel-500" />
                Resultados para <span className="font-bold text-crema-100">“{query.trim()}”</span>
                <button
                  onClick={() => setQuery("")}
                  className="ml-1 flex items-center gap-1 rounded-full border border-espresso-600 px-2.5 py-0.5 text-xs font-semibold text-crema-300 transition hover:border-ember-500/60 hover:text-ember-400"
                >
                  <XIcon className="text-xs" /> Quitar
                </button>
              </p>
            )}

            {/* rejilla */}
            <div className="mt-8">
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-espresso-700/70 bg-espresso-850">
                      <div className="skeleton aspect-square" />
                      <div className="space-y-3 p-5">
                        <div className="skeleton h-5 w-2/3 rounded" />
                        <div className="skeleton h-3.5 w-1/2 rounded" />
                        <div className="skeleton h-3.5 w-5/6 rounded" />
                        <div className="skeleton h-9 w-full rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onOpen={setDetail} onQuickAdd={(prod) => addToCart(prod)} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-espresso-600 bg-espresso-850/50 px-6 py-16 text-center">
                  <BeanIcon className="text-5xl text-crema-500" />
                  <p className="font-display text-2xl text-crema-200">Nada por aquí…</p>
                  <p className="max-w-sm text-sm text-crema-400">
                    No encontramos ningún café que coincida con tu búsqueda o filtros. Prueba con otra nota
                    de cata: «cacao», «panela», «floral»…
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-1 rounded-full bg-caramel-500 px-6 py-2.5 text-sm font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-95"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ─── El ritual ─── */}
          <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-crema-50 sm:text-4xl">
                El ritual de <em className="font-light italic text-caramel-400">la casa</em>
              </h2>
            </Reveal>
            <div className="mt-8 grid divide-y divide-espresso-800 border-y border-espresso-800 md:grid-cols-3 md:divide-x md:divide-y-0">
              {RITUAL.map((r, i) => (
                <Reveal key={r.n} delay={i * 120} className="group py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
                  <span className="font-display text-5xl font-light text-espresso-700 transition-colors duration-500 group-hover:text-caramel-500/70">
                    {r.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-crema-50">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-crema-400">{r.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* capas */}
      {detail && <ProductModal product={detail} onClose={() => setDetail(null)} onAdd={(p, w, g, q) => addToCart(p, w, g, q)} />}

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutModal
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
        />
      )}

      <Toasts toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} onOpenCart={() => setCartOpen(true)} />
    </div>
  );
}
