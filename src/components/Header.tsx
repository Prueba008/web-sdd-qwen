import { useEffect, useState } from "react";
import { BeanIcon, CartIcon, SearchIcon, XIcon } from "./Icons";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  cartCount: number;
  badgeKey: number;
  onOpenCart: () => void;
}

const NAV = [
  { href: "#la-carta", label: "La carta" },
  { href: "#origenes", label: "Orígenes" },
  { href: "#ritual", label: "El ritual" },
];

export default function Header({ query, onQuery, cartCount, badgeKey, onOpenCart }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-espresso-700/80 bg-espresso-950/90 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)]"
          : "border-transparent bg-espresso-950/55"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all duration-300 sm:px-6 ${scrolled ? "py-2.5" : "py-4"}`}>
        <a href="#inicio" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-caramel-500 text-espresso-950 shadow-[0_6px_20px_-6px_rgba(217,142,50,0.8)] transition-transform duration-500 group-hover:rotate-[140deg]">
            <BeanIcon className="text-xl" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-black tracking-tight text-crema-50">
              Café <em className="font-light italic text-caramel-400">Obscura</em>
            </span>
            <span className="mt-0.5 block font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-crema-500">
              Tostaduría · Est. 2019
            </span>
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Secciones">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-crema-300 transition hover:bg-espresso-800 hover:text-caramel-300"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="relative ml-auto hidden w-full max-w-xs md:block lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-crema-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            type="search"
            placeholder="Buscar origen, nota de cata…"
            aria-label="Buscar cafés"
            className="w-full rounded-full border border-espresso-600/80 bg-espresso-800/80 py-2.5 pl-10 pr-9 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 focus:bg-espresso-800 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-crema-400 transition hover:text-caramel-400"
            >
              <XIcon />
            </button>
          )}
        </div>

        <button
          onClick={onOpenCart}
          className="relative ml-auto flex shrink-0 items-center gap-2 rounded-full border border-caramel-500/50 bg-espresso-800/70 px-4 py-2.5 text-sm font-bold text-caramel-300 transition hover:border-caramel-400 hover:bg-espresso-700 active:scale-95 md:ml-0"
        >
          <CartIcon className="text-lg" />
          <span className="hidden sm:inline">Carrito</span>
          {cartCount > 0 && (
            <span
              key={badgeKey}
              className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-caramel-500 px-1 text-[11px] font-bold text-espresso-950"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="border-t border-espresso-800/80 px-4 pb-3 pt-2 md:hidden">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-crema-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            type="search"
            placeholder="Buscar origen, nota de cata…"
            aria-label="Buscar cafés"
            className="w-full rounded-full border border-espresso-600/80 bg-espresso-800/80 py-2.5 pl-10 pr-9 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-crema-400"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
