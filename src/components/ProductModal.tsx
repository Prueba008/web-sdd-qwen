import { useEffect, useState } from "react";
import type { Product, Weight } from "../types";
import { CATEGORY_LABELS, GRINDS } from "../data/products";
import { money, priceForWeight, weightLabel } from "../lib/format";
import RoastMeter from "./RoastMeter";
import { BagIcon, CheckIcon, MinusIcon, PinIcon, PlusIcon, XIcon } from "./Icons";

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, weight: Weight, grind: string, qty: number) => void;
}

const SPECS: { key: "process" | "altitude" | "variety"; label: string }[] = [
  { key: "process", label: "Proceso" },
  { key: "altitude", label: "Altitud" },
  { key: "variety", label: "Variedad" },
];

export default function ProductModal({ product, onClose, onAdd }: Props) {
  const [weight, setWeight] = useState<Weight>(250);
  const [grind, setGrind] = useState<string>(GRINDS[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const unit = priceForWeight(product.price, weight);
  const total = unit * qty;

  const handleAdd = () => {
    onAdd(product, weight, grind, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Detalle de ${product.name}`}>
      <button aria-label="Cerrar detalle" onClick={onClose} className="absolute inset-0 animate-fade-in cursor-default bg-espresso-950/75 backdrop-blur-sm" />
      <div className="relative max-h-[94vh] w-full max-w-4xl animate-panel-in overflow-y-auto rounded-t-2xl border border-espresso-700/80 bg-espresso-900 shadow-2xl nice-scroll sm:rounded-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-espresso-600 bg-espresso-950/70 text-crema-300 backdrop-blur transition hover:border-caramel-500 hover:text-caramel-300 active:scale-90"
        >
          <XIcon />
        </button>

        <div className="grid md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden bg-espresso-800">
            <img src={product.image} alt={`Bolsa de café ${product.name}`} className="h-64 w-full object-cover sm:h-80 md:h-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-caramel-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso-950">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="pr-10 font-display text-3xl font-semibold tracking-tight text-crema-50 sm:text-4xl">
              {product.name}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-crema-400">
              <PinIcon className="text-caramel-500" /> {product.origin}
            </p>
            <div className="mt-4">
              <RoastMeter roast={product.roast} />
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-crema-200">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.notes.map((n) => (
                <span key={n} className="rounded-full border border-caramel-500/35 bg-caramel-500/10 px-3 py-1 text-xs font-semibold text-caramel-300">
                  {n}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-3">
              {SPECS.map((s) => (
                <div key={s.key} className="rounded-lg border border-espresso-700/80 bg-espresso-850 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-crema-500">{s.label}</dt>
                  <dd className="mt-1 text-xs font-semibold leading-snug text-crema-200">{product[s.key]}</dd>
                </div>
              ))}
            </dl>

            {/* presentación */}
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-crema-400">Presentación</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([250, 1000] as Weight[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`rounded-lg border px-4 py-2.5 text-left transition active:scale-[0.98] ${
                      weight === w
                        ? "border-caramel-500 bg-caramel-500/15"
                        : "border-espresso-600 bg-espresso-850 hover:border-crema-500/50"
                    }`}
                  >
                    <span className={`block text-sm font-bold ${weight === w ? "text-caramel-300" : "text-crema-200"}`}>
                      {weightLabel(w)}
                    </span>
                    <span className="block text-xs text-crema-400">
                      {money(priceForWeight(product.price, w))}
                      {w === 1000 && <em className="ml-1 not-italic text-sage-400">· ahorra 5 %</em>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* molienda */}
            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-crema-400">Molienda</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${
                      grind === g
                        ? "border-caramel-500 bg-caramel-500 text-espresso-950"
                        : "border-espresso-600 text-crema-300 hover:border-crema-500/60"
                    }`}
                  >
                    {grind === g && <CheckIcon className="text-sm" />}
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* cantidad + añadir */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-espresso-700/80 pt-6">
              <div className="flex items-center rounded-full border border-espresso-600 bg-espresso-850">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Quitar una unidad"
                  className="grid h-11 w-11 place-items-center text-crema-300 transition hover:text-caramel-400 active:scale-90 disabled:opacity-30"
                >
                  <MinusIcon />
                </button>
                <span className="w-8 text-center text-base font-bold text-crema-50" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  aria-label="Añadir una unidad"
                  className="grid h-11 w-11 place-items-center text-crema-300 transition hover:text-caramel-400 active:scale-90"
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 font-display text-base font-bold transition-all active:scale-[0.97] ${
                  added
                    ? "bg-sage-500 text-espresso-950"
                    : "bg-caramel-500 text-espresso-950 hover:bg-caramel-400"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="text-xl" /> Añadido al carrito
                  </>
                ) : (
                  <>
                    <BagIcon className="text-xl" /> Añadir · {money(total)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
