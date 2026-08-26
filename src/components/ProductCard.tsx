import { useRef, useState } from "react";
import type { Product } from "../types";
import { CATEGORY_LABELS } from "../data/products";
import { money } from "../lib/format";
import RoastMeter from "./RoastMeter";
import Reveal from "./Reveal";
import { CheckIcon, PinIcon, PlusIcon } from "./Icons";

interface Props {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export default function ProductCard({ product, index, onOpen, onQuickAdd }: Props) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const handleAdd = () => {
    onQuickAdd(product);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <Reveal as="article" delay={(index % 3) * 90} className="h-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(product);
          }
        }}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-espresso-700/70 bg-espresso-850 transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel-500/50 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
      >
        <div className="relative aspect-square overflow-hidden bg-espresso-800">
          <img
            src={product.image}
            alt={`Bolsa de café ${product.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent opacity-60" />
          <span className="absolute left-3 top-3 rounded-full border border-crema-50/15 bg-espresso-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-crema-200 backdrop-blur-sm">
            {CATEGORY_LABELS[product.category]}
          </span>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-crema-100 px-4 py-1.5 text-xs font-bold text-espresso-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalle y molienda
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold leading-snug text-crema-50 transition-colors group-hover:text-caramel-300">
                {product.name}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-crema-400">
                <PinIcon className="shrink-0 text-caramel-500" /> {product.origin}
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {product.notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-espresso-600/90 px-2.5 py-0.5 text-[11px] font-medium text-crema-300"
              >
                {note}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <RoastMeter roast={product.roast} />
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-espresso-700/70 pt-4">
            <p className="font-display text-2xl font-bold text-crema-50">
              {money(product.price)}
              <span className="ml-1.5 text-xs font-normal text-crema-400">/ 250 g</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              aria-label={`Añadir ${product.name} al carrito`}
              className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition-all duration-300 active:scale-90 ${
                added
                  ? "bg-sage-500 text-espresso-950"
                  : "bg-caramel-500 text-espresso-950 hover:bg-caramel-400 hover:px-5"
              }`}
            >
              {added ? <CheckIcon className="text-lg" /> : <PlusIcon className="text-lg" />}
              {added ? "Listo" : "Añadir"}
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
