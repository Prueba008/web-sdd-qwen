import { ArrowDownIcon, BeanIcon, CupIcon, FlameIcon, LeafIcon, TruckIcon } from "./Icons";
import Reveal from "./Reveal";

const MARQUEE_NOTES = [
  "Bergamota",
  "Jazmín",
  "Panela",
  "Avellana",
  "Cacao",
  "Frutos rojos",
  "Caramelo",
  "Miel de caña",
  "Durazno blanco",
  "Nuez tostada",
];

function SpinningBadge() {
  return (
    <div className="absolute -left-4 top-4 z-10 h-28 w-28 sm:-left-8 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slower text-caramel-300">
        <defs>
          <path id="badge-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-current text-[8.2px] font-semibold uppercase" style={{ letterSpacing: "0.22em" }}>
          <textPath href="#badge-circle">Tueste fresco · cada semana · café obscura ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <BeanIcon className="text-2xl text-caramel-400" />
      </span>
    </div>
  );
}

function SteamCup() {
  return (
    <div className="relative grid place-items-center">
      <div className="relative grid h-64 w-64 place-items-center rounded-full bg-gradient-to-br from-caramel-400 to-caramel-600 shadow-[0_30px_80px_-20px_rgba(217,142,50,0.45)] sm:h-80 sm:w-80">
        <div className="absolute inset-3 rounded-full border border-espresso-900/20" />
        <svg viewBox="0 0 120 120" className="w-44 text-espresso-950 sm:w-56" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M78 38c0-5-6-7-12-7M30 44h52v22a18 18 0 0 1-18 18H48a18 18 0 0 1-18-18V44Z" />
          <path d="M82 48h6a10 10 0 0 1 0 20h-7" />
          <path d="M38 94h38" />
          <g stroke="currentColor" strokeWidth="3">
            <path d="M44 32c-2.5 3 2.5 5 0 8" className="animate-steam" style={{ animationDelay: "0s" }} />
            <path d="M56 28c-2.5 3 2.5 5 0 8" className="animate-steam" style={{ animationDelay: "0.7s" }} />
            <path d="M68 32c-2.5 3 2.5 5 0 8" className="animate-steam" style={{ animationDelay: "1.4s" }} />
          </g>
        </svg>
      </div>
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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[540px] w-[540px] rounded-full bg-caramel-500/10 blur-3xl" />
        <div className="absolute -left-52 top-32 h-[420px] w-[420px] rounded-full bg-ember-500/10 blur-3xl" />
        <BeanIcon className="absolute -bottom-24 -right-20 h-[420px] w-[420px] rotate-12 text-espresso-800/60" strokeWidth={0.8} />
        <BeanIcon className="absolute -left-28 top-6 h-72 w-72 -rotate-45 text-espresso-800/40" strokeWidth={0.8} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-16">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-caramel-400">
              <span className="h-px w-10 bg-caramel-500/70" />
              Tostaduría de especialidad · Lote 214
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-crema-50 sm:text-6xl lg:text-[4.4rem]">
              Tostamos <em className="font-light italic text-caramel-400">esta semana</em>
              <br />
              lo que beberás la próxima.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-crema-300 sm:text-lg">
              Seis lotes pequeños de fincas que conocemos por nombre. Elige tu grano y molienda;
              nosotros lo tostamos al pedido y te lo enviamos antes de que pierda el aroma.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={onExplore}
                className="group flex items-center gap-2.5 rounded-full bg-caramel-500 px-7 py-3.5 font-display text-base font-bold text-espresso-950 shadow-[0_14px_40px_-12px_rgba(217,142,50,0.6)] transition hover:bg-caramel-400 hover:shadow-[0_18px_46px_-12px_rgba(232,168,87,0.7)] active:scale-95"
              >
                Explorar la barra
                <ArrowDownIcon className="text-lg transition-transform duration-300 group-hover:translate-y-1" />
              </button>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-crema-400">
                <span className="flex items-center gap-1.5"><LeafIcon className="text-sage-400" /> 6 orígenes vivos</span>
                <span className="flex items-center gap-1.5"><FlameIcon className="text-ember-400" /> Tueste semanal</span>
                <span className="flex items-center gap-1.5"><TruckIcon className="text-caramel-400" /> Envío gratis +$40</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <SpinningBadge />
            <SteamCup />
            <span
              className="absolute -left-2 bottom-10 animate-float rounded-full border border-espresso-600 bg-espresso-850/90 px-3.5 py-1.5 font-display text-sm italic text-crema-200 shadow-lg sm:bottom-16"
              style={{ ["--float-rot" as never]: "-4deg" }}
            >
              bergamota
            </span>
            <span
              className="absolute -right-1 top-24 animate-float rounded-full border border-espresso-600 bg-espresso-850/90 px-3.5 py-1.5 font-display text-sm italic text-crema-200 shadow-lg sm:-right-4"
              style={{ ["--float-rot" as never]: "3deg", animationDelay: "1.2s" }}
            >
              panela
            </span>
            <span
              className="absolute -bottom-3 right-10 animate-float rounded-full border border-espresso-600 bg-espresso-850/90 px-3.5 py-1.5 font-display text-sm italic text-crema-200 shadow-lg"
              style={{ ["--float-rot" as never]: "-2deg", animationDelay: "2.1s" }}
            >
              cacao 70 %
            </span>
          </div>
        </Reveal>
      </div>

      {/* cinta de notas de cata */}
      <div className="relative border-y border-espresso-700/70 bg-espresso-950/60 py-3.5">
        <div className="flex overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee items-center gap-8 pr-8">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8">
                {MARQUEE_NOTES.map((note) => (
                  <span key={`${dup}-${note}`} className="flex items-center gap-8">
                    <span className="font-display text-lg italic text-crema-300/90">{note}</span>
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
