import { products } from "../data/products";
import { ArrowDownIcon, BeanIcon, FlameIcon, LeafIcon, TruckIcon } from "./Icons";
import Reveal from "./Reveal";

const MARQUEE_NOTES = [
  "Bergamota", "Jazmín", "Panela", "Avellana", "Cacao",
  "Frutos rojos", "Caramelo", "Miel de caña", "Durazno blanco", "Nuez tostada",
];

const POSTCARDS = [
  { idx: 0, cls: "z-30 -rotate-3 sm:-translate-x-6 sm:-rotate-6", delay: "0s" },
  { idx: 3, cls: "z-20 rotate-2 translate-y-8 sm:translate-y-14 sm:translate-x-10", delay: "1.4s" },
  { idx: 4, cls: "z-10 -rotate-1 translate-y-2 -translate-x-4 sm:translate-x-28 sm:translate-y-2 sm:rotate-6", delay: "2.6s" },
];

function Steam() {
  return (
    <svg viewBox="0 0 60 40" className="absolute -top-9 left-1/2 h-10 w-14 -translate-x-1/2 text-crema-200" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 36c-3 4 3 6 0 10" className="animate-steam" style={{ animationDelay: "0s" }} />
      <path d="M30 32c-3 4 3 6 0 10" className="animate-steam" style={{ animationDelay: "0.8s" }} />
      <path d="M42 36c-3 4 3 6 0 10" className="animate-steam" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}

function SpinningStamp() {
  return (
    <div className="absolute -left-5 top-2 z-40 h-28 w-28 sm:-left-10 sm:h-36 sm:w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slower text-caramel-300">
        <defs>
          <path id="stamp-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="47" fill="var(--color-espresso-950)" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        <text className="fill-current text-[8px] font-semibold uppercase" style={{ letterSpacing: "0.24em", fontFamily: "var(--font-mono)" }}>
          <textPath href="#stamp-circle">tueste fresco · cada lunes · café obscura · </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <FlameIcon className="text-2xl text-ember-400 sm:text-3xl" />
      </span>
    </div>
  );
}

interface Props {
  onExplore: () => void;
}

export default function Masthead({ onExplore }: Props) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* fondo por capas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-44 -top-44 h-[560px] w-[560px] rounded-full bg-caramel-500/10 blur-3xl" />
        <div className="absolute -left-56 top-40 h-[460px] w-[460px] rounded-full bg-ember-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sage-500/8 blur-3xl" />
        <BeanIcon className="absolute -bottom-28 -right-24 h-[440px] w-[440px] rotate-12 text-espresso-800/50" strokeWidth={0.7} />
        <BeanIcon className="absolute -left-32 top-10 h-80 w-80 -rotate-45 text-espresso-800/35" strokeWidth={0.7} />
        {/* líneas de contorno tipo mapa de finca */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="var(--color-crema-300)" strokeWidth="0.12">
          <path d="M-5 22c20-8 42 10 62 2s36-14 48-6" />
          <path d="M-5 34c22-9 44 11 64 2s34-13 46-5" />
          <path d="M-5 46c24-10 46 12 66 2s32-12 44-4" />
          <path d="M-5 82c20-8 42 10 62 2s36-14 48-6" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-caramel-400">
              <span className="h-2 w-2 animate-blink rounded-full bg-ember-400" />
              Roastería de especialidad · CDMX · Lote 214
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.9rem] font-black leading-[0.98] tracking-tight text-crema-50 sm:text-6xl lg:text-[4.6rem]">
              El café se
              <br />
              juzga en
              <br />
              <span className="relative inline-block">
                <em className="font-light italic text-caramel-400">la taza.</em>
                <svg className="absolute -bottom-2 left-0 w-full text-ember-500/70" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9c40-6 120-6 196-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-crema-300 sm:text-lg">
              Seis lotes pequeños de fincas que conocemos por nombre. Tostamos cada lunes,
              molimos a tu método y lo enviamos antes de que el aroma se rinda.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <button
                onClick={onExplore}
                className="group flex items-center gap-3 rounded-full bg-caramel-500 px-8 py-4 font-display text-lg font-bold text-espresso-950 shadow-[0_16px_44px_-12px_rgba(217,142,50,0.65)] transition hover:bg-caramel-400 hover:shadow-[0_20px_52px_-12px_rgba(232,168,87,0.75)] active:scale-95"
              >
                Explorar la carta
                <ArrowDownIcon className="text-xl transition-transform duration-300 group-hover:translate-y-1" />
              </button>
              <a href="#origenes" className="group text-sm font-bold text-crema-300 underline decoration-caramel-500/60 decoration-2 underline-offset-8 transition hover:text-caramel-300">
                Conoce las fincas
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-espresso-700/70 pt-6">
              {[
                { k: "86+", v: "puntos SCA", c: "text-caramel-300" },
                { k: "6", v: "lotes vivos", c: "text-sage-300" },
                { k: "72 h", v: "del tueste a tu puerta", c: "text-ember-400" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className={`font-display text-3xl font-black ${s.c}`}>{s.k}</dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.18em] text-crema-500">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* postales de bolsas */}
        <Reveal delay={220} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative flex items-center justify-center py-10 sm:py-14">
            <SpinningStamp />
            {POSTCARDS.map((c, i) => {
              const p = products[c.idx];
              return (
                <div
                  key={p.id}
                  className={`absolute w-40 animate-float sm:w-52 ${c.cls}`}
                  style={{ animationDelay: c.delay }}
                >
                  <figure className="group relative overflow-hidden rounded-lg border border-crema-50/10 bg-espresso-800 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:z-50 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.04]">
                    {i === 0 && <Steam />}
                    <img src={p.image} alt={`Bolsa de ${p.name}`} className="aspect-[4/5] w-full object-cover" />
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-espresso-950/85 px-3 py-2 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                      <p className="truncate font-display text-sm font-semibold text-crema-100">{p.name}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-caramel-400">{p.origin}</p>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
            {/* soporte invisible para dar altura al collage */}
            <div className="h-72 w-40 sm:h-[22rem] sm:w-52" aria-hidden="true" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-crema-400">
            <span className="flex items-center gap-1.5"><LeafIcon className="text-sage-400" /> Trato directo</span>
            <span className="flex items-center gap-1.5"><FlameIcon className="text-ember-400" /> Tueste al pedido</span>
            <span className="flex items-center gap-1.5"><TruckIcon className="text-caramel-400" /> Envío gratis +$40</span>
          </div>
        </Reveal>
      </div>

      {/* cinta de notas de cata */}
      <div className="relative border-y border-espresso-700/70 bg-espresso-950/70 py-4">
        <div className="flex overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee items-center gap-10 pr-10">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10">
                {MARQUEE_NOTES.map((note) => (
                  <span key={`${dup}-${note}`} className="flex items-center gap-10">
                    <span className="font-display text-xl italic text-crema-300/90">{note}</span>
                    <BeanIcon className="text-sm text-caramel-500/80" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
