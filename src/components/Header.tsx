import { BeanIcon, CartIcon, SearchIcon, XIcon } from "./Icons";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  cartCount: number;
  badgeKey: number;
  onOpenCart: () => void;
}

export default function Header({ query, onQuery, cartCount, badgeKey, onOpenCart }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-espresso-700/60 bg-espresso-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#inicio" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-caramel-500 text-espresso-950 transition-transform duration-300 group-hover:rotate-[20deg]">
            <BeanIcon className="text-lg" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-crema-50">
              Café Obscura
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-caramel-400">
              Tostaduría
            </span>
          </span>
        </a>

        <div className="relative ml-auto hidden w-full max-w-sm md:block">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-crema-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            type="search"
            placeholder="Buscar origen, nota de cata…"
            aria-label="Buscar cafés"
            className="w-full rounded-full border border-espresso-600/80 bg-espresso-800/80 py-2 pl-10 pr-9 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 focus:bg-espresso-800 [&::-webkit-search-cancel-button]:hidden"
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
          className="relative ml-auto flex shrink-0 items-center gap-2 rounded-full border border-caramel-500/50 bg-espresso-800/60 px-4 py-2 text-sm font-semibold text-caramel-300 transition hover:border-caramel-400 hover:bg-espresso-700 hover:text-caramel-300 active:scale-95 md:ml-0"
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
            className="w-full rounded-full border border-espresso-600/80 bg-espresso-800/80 py-2 pl-10 pr-9 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 [&::-webkit-search-cancel-button]:hidden"
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
