import { useRef, useState } from "react";
import { products } from "../data/products";
import type { Weight } from "../types";
import { money, priceForWeight, roastLabel, weightLabel } from "../lib/format";
import Reveal from "./Reveal";
import { BagIcon, CheckIcon, MinusIcon, PinIcon, PlusIcon } from "./Icons";

interface Props {
  onAdd: (product: (typeof products)[number], weight: Weight, grind: string, qty: number) => void;
  onOpenDetail: (product: (typeof products)[number]) => void;
}

const featured = products[0]; // Etiopía Yirgacheffe

export default function Spotlight({ onAdd, onOpenDetail }: Props) {
  const [weight, setWeight] = useState<Weight>(250);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const unit = priceForWeight(featured.price, weight);

  const handleAdd = () => {
    onAdd(featured, weight, "En grano", qty);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24" aria-label="Tueste de la semana">
      <Reveal>
        <div className="paper-sheet relative overflow-hidden rounded-xl text-espresso-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
          {/* sello giratorio */}
          <div className="pointer-events-none absolute -right-10 -top-10 z-10 h-36 w-36 opacity-90 sm:h-44 sm:w-44">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slower">
              <defs>
                <path id="spot-stamp" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
              </defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-caramel-600)" strokeWidth="1.4" strokeDasharray="4 3" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="var(--color-caramel-600)" strokeWidth="1" />
              <text fill="var(--color-caramel-600)" fontSize="7.2" fontWeight="700" style={{ letterSpacing: "0.22em", fontFamily: "var(--font-mono)" }}>
                <textPath href="#spot-stamp">LOTE 214 · TOSTADO EL LUNES · FRESCO ·</textPath>
              </text>
              <text x="50" y="54" textAnchor="middle" fill="var(--color-caramel-600)" fontSize="11" fontWeight="700" fontFamily="var(--font-display)" fontStyle="italic">
                214
              </text>
            </svg>
          </div>

          {/* manchas de taza */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 h-24 w-24 -translate-x-8 rounded-full border-[6px] border-caramel-600/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-6 right-16 h-16 w-16 rounded-full border-[5px] border-caramel-600/10" aria-hidden="true" />

          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* imagen con ken burns */}
            <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-full">
              <img
                src={featured.image}
                alt={`Bolsa de café ${featured.name}`}
                className="absolute inset-0 h-full w-full animate-kenburns object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/35 via-transparent to-transparent lg:bg-gradient-to-r" />
              <span className="absolute left-5 top-5 rounded-full bg-espresso-950/80 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-caramel-300 backdrop-blur-sm">
                En barra esta semana
              </span>
            </div>

            {/* ficha de cata */}
            <div className="relative p-7 sm:p-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-caramel-600">
                Ficha de cata · Nº 214-A
              </p>
              <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
                {featured.name.split(" ")[0]}{" "}
                <em className="font-light italic text-caramel-600">{featured.name.split(" ").slice(1).join(" ")}</em>
              </h2>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-espresso-700">
                <PinIcon className="text-caramel-600" /> {featured.origin}
              </p>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-espresso-800">
                {featured.description}
              </p>

              {/* notas en grande */}
              <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {featured.notes.map((n, i) => (
                  <span key={n} className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] font-bold text-caramel-600">0{i + 1}</span>
                    <span className="font-display text-2xl font-semibold italic">{n}</span>
                  </span>
                ))}
              </div>

              {/* specs técnicos */}
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-dashed border-espresso-900/25 py-5 sm:grid-cols-4">
                {[
                  { k: "Proceso", v: featured.process },
                  { k: "Altitud", v: featured.altitude },
                  { k: "Variedad", v: featured.variety },
                  { k: "Tueste", v: `${roastLabel(featured.roast)} · ${featured.roast}/5` },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-espresso-900/55">{s.k}</dt>
                    <dd className="mt-1 text-[13px] font-bold leading-snug text-espresso-900">{s.v}</dd>
                  </div>
                ))}
              </dl>

              {/* compra */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="flex rounded-full border-2 border-espresso-900/20 bg-crema-50/60 p-1">
                  {([250, 1000] as Weight[]).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-95 ${
                        weight === w ? "bg-espresso-900 text-crema-100 shadow" : "text-espresso-800 hover:text-espresso-950"
                      }`}
                    >
                      {weightLabel(w)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center rounded-full border-2 border-espresso-900/20 bg-crema-50/60">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Quitar una unidad"
                    className="grid h-11 w-11 place-items-center text-espresso-800 transition hover:text-caramel-600 active:scale-90 disabled:opacity-30"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-7 text-center text-base font-black" aria-live="polite">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(12, q + 1))}
                    aria-label="Añadir una unidad"
                    className="grid h-11 w-11 place-items-center text-espresso-800 transition hover:text-caramel-600 active:scale-90"
                  >
                    <PlusIcon />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex h-12 items-center gap-2.5 rounded-full px-7 font-display text-base font-bold transition-all active:scale-[0.96] ${
                    added
                      ? "bg-sage-500 text-espresso-950"
                      : "bg-espresso-900 text-crema-100 hover:bg-espresso-800 hover:shadow-[0_14px_34px_-12px_rgba(16,10,6,0.7)]"
                  }`}
                >
                  {added ? <CheckIcon className="text-xl" /> : <BagIcon className="text-xl" />}
                  {added ? "En el carrito" : `Añadir · ${money(unit * qty)}`}
                </button>
              </div>

              <button
                onClick={() => onOpenDetail(featured)}
                className="mt-4 text-sm font-bold text-caramel-600 underline decoration-caramel-600/50 decoration-2 underline-offset-4 transition hover:text-caramel-500"
              >
                Elegir molienda y ver la ficha completa
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
