import { useState } from "react";
import { BeanIcon, CheckIcon, CupIcon, PinIcon } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const subscribe = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Escribe un correo válido, por favor.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer className="relative mt-24 border-t border-espresso-700/70 bg-espresso-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-caramel-500 text-espresso-950">
              <BeanIcon className="text-lg" />
            </span>
            <span className="font-display text-xl font-bold text-crema-50">Café Obscura</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-crema-400">
            Tostamos en lotes de 12 kg cada lunes y jueves. Compramos verde directamente a
            productores de Etiopía, Colombia, Brasil y México, pagando por calidad, no por bolsa.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-crema-300">
            <PinIcon className="text-caramel-500" /> Calle del Tueste 214, Col. Doctores, CDMX
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-caramel-400">La barra abre</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-crema-300">
            <li className="flex items-center gap-2.5"><CupIcon className="text-caramel-500" /> Lunes a viernes · 8:00 – 20:00</li>
            <li className="flex items-center gap-2.5"><CupIcon className="text-caramel-500" /> Sábado · 9:00 – 18:00</li>
            <li className="flex items-center gap-2.5"><CupIcon className="text-caramel-500" /> Domingo · solo para llevar</li>
          </ul>
          <p className="mt-5 rounded-lg border border-espresso-700 bg-espresso-900 px-4 py-3 text-xs leading-relaxed text-crema-500">
            ¿Cafetería o restaurante? Hacemos perfiles a medida y venta al mayoreo. Escríbenos a
            <span className="font-semibold text-caramel-300"> barra@cafeobscura.mx</span>
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-caramel-400">El boletín del tueste</h3>
          <p className="mt-4 text-sm text-crema-400">
            Un correo cada lunes: qué tostamos, notas de cata y preventa de micro-lotes.
          </p>
          {subscribed ? (
            <p className="mt-4 flex items-center gap-2 rounded-full border border-sage-500/40 bg-sage-500/10 px-4 py-3 text-sm font-semibold text-sage-300">
              <CheckIcon /> ¡Listo! Tu primer boletín llega el lunes.
            </p>
          ) : (
            <>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && subscribe()}
                  placeholder="tu@correo.com"
                  aria-label="Correo para el boletín"
                  className={`min-w-0 flex-1 rounded-full border bg-espresso-900 px-4 py-2.5 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 ${error ? "border-ember-500" : "border-espresso-600"}`}
                />
                <button
                  onClick={subscribe}
                  className="shrink-0 rounded-full bg-caramel-500 px-5 py-2.5 text-sm font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-95"
                >
                  Suscribir
                </button>
              </div>
              {error && <p className="mt-2 text-xs font-semibold text-ember-400">{error}</p>}
            </>
          )}
        </div>
      </div>

      <div className="border-t border-espresso-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-crema-500 sm:flex-row sm:px-6">
          <p>© 2026 Café Obscura · Hecho a fuego lento.</p>
          <p>Tienda de demostración — todos los pagos son simulados.</p>
        </div>
      </div>
    </footer>
  );
}
