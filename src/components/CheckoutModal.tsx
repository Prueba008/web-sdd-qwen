import { useEffect, useState } from "react";
import type { EnrichedItem } from "./CartDrawer";
import { money, orderCode, weightLabel } from "../lib/format";
import { CardIcon, CheckIcon, LockIcon, SpinnerIcon, TruckIcon, XIcon } from "./Icons";

type Step = "shipping" | "payment" | "processing" | "success";

interface Props {
  items: EnrichedItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

interface FieldProps {
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
}

function Field({ label, error, value, onChange, placeholder, type = "text", inputMode, maxLength }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-crema-400">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-espresso-850 px-3.5 py-2.5 text-sm text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 ${
          error ? "border-ember-500" : "border-espresso-600"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-ember-400">{error}</span>}
    </label>
  );
}

const STEPS = ["Envío", "Pago", "Confirmación"];

export default function CheckoutModal({ items, subtotal, shipping, total, onClose, onComplete }: Props) {
  const [step, setStep] = useState<Step>("shipping");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [ship, setShip] = useState({ name: "", email: "", address: "", city: "", cp: "", country: "México" });
  const [pay, setPay] = useState({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
  const [code, setCode] = useState("");

  const stepIndex = step === "shipping" ? 0 : step === "payment" ? 1 : 2;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleClose = () => {
    if (step === "processing") return;
    if (step === "success") onComplete();
    else onClose();
  };

  const setS = (k: keyof typeof ship) => (v: string) => setShip((s) => ({ ...s, [k]: v }));
  const setP = (k: keyof typeof pay) => (v: string) => setPay((s) => ({ ...s, [k]: v }));

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (ship.name.trim().length < 3) e.name = "Escribe tu nombre completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ship.email)) e.email = "Correo no válido.";
    if (ship.address.trim().length < 5) e.address = "Calle, número y colonia.";
    if (ship.city.trim().length < 2) e.city = "Indica tu ciudad.";
    if (ship.cp.trim().length < 3) e.cp = "C.P. no válido.";
    return e;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (pay.cardName.trim().length < 3) e.cardName = "Nombre como aparece en la tarjeta.";
    if (pay.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Son 16 dígitos.";
    const m = pay.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = "Usa el formato MM/AA.";
    else if (Number(`20${m[2]}`) < 26 || (Number(`20${m[2]}`) === 26 && Number(m[1]) < 2)) e.expiry = "La tarjeta está vencida.";
    if (!/^\d{3,4}$/.test(pay.cvc)) e.cvc = "3 o 4 dígitos.";
    return e;
  };

  const goPayment = () => {
    const e = validateShipping();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep("payment");
  };

  const payNow = () => {
    const e = validatePayment();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep("processing");
    window.setTimeout(() => {
      setCode(orderCode());
      setStep("success");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Proceso de pago">
      <button aria-label="Cerrar" onClick={handleClose} disabled={step === "processing"} className="absolute inset-0 animate-fade-in cursor-default bg-espresso-950/80 backdrop-blur-sm disabled:cursor-wait" />

      <div className="relative flex max-h-[94vh] w-full max-w-3xl animate-panel-in flex-col overflow-hidden rounded-t-2xl border border-espresso-700/80 bg-espresso-900 shadow-2xl sm:rounded-2xl">
        {/* cabecera con progreso */}
        <header className="flex items-center justify-between gap-4 border-b border-espresso-700/80 px-6 py-4">
          <ol className="flex flex-1 items-center gap-2 sm:gap-3">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-300 ${
                      i < stepIndex
                        ? "bg-sage-500 text-espresso-950"
                        : i === stepIndex
                          ? "bg-caramel-500 text-espresso-950"
                          : "border border-espresso-600 text-crema-500"
                    }`}
                  >
                    {i < stepIndex ? <CheckIcon className="text-sm" /> : i + 1}
                  </span>
                  <span className={`hidden text-xs font-bold uppercase tracking-[0.14em] sm:block ${i === stepIndex ? "text-caramel-300" : "text-crema-500"}`}>
                    {label}
                  </span>
                </span>
                {i < STEPS.length - 1 && (
                  <span className={`h-px flex-1 transition-colors duration-500 ${i < stepIndex ? "bg-sage-500" : "bg-espresso-700"}`} />
                )}
              </li>
            ))}
          </ol>
          <button
            onClick={handleClose}
            disabled={step === "processing"}
            aria-label="Cerrar proceso de pago"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso-600 text-crema-300 transition hover:border-caramel-500 hover:text-caramel-300 active:scale-90 disabled:opacity-40"
          >
            <XIcon />
          </button>
        </header>

        <div className="grid flex-1 overflow-y-auto nice-scroll md:grid-cols-[1.15fr_0.85fr]">
          {/* columna de contenido según paso */}
          <div className="p-6 sm:p-7">
            {step === "shipping" && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-semibold text-crema-50">¿A dónde enviamos?</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-crema-400">
                  <TruckIcon className="text-caramel-500" /> Envío en 48 – 72 h con el tueste recién hecho.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Nombre completo" value={ship.name} onChange={setS("name")} placeholder="María Fernanda López" error={errors.name} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Correo electrónico" type="email" inputMode="email" value={ship.email} onChange={setS("email")} placeholder="maria@correo.com" error={errors.email} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Dirección" value={ship.address} onChange={setS("address")} placeholder="Calle, número, colonia" error={errors.address} />
                  </div>
                  <Field label="Ciudad" value={ship.city} onChange={setS("city")} placeholder="Ciudad de México" error={errors.city} />
                  <Field label="Código postal" inputMode="numeric" maxLength={6} value={ship.cp} onChange={setS("cp")} placeholder="06720" error={errors.cp} />
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-crema-400">País</span>
                    <select
                      value={ship.country}
                      onChange={(e) => setS("country")(e.target.value)}
                      className="w-full rounded-lg border border-espresso-600 bg-espresso-850 px-3.5 py-2.5 text-sm text-crema-100 transition focus:border-caramel-500"
                    >
                      {["México", "Colombia", "España", "Estados Unidos", "Argentina", "Chile"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <button
                  onClick={goPayment}
                  className="mt-6 w-full rounded-full bg-caramel-500 py-3.5 font-display text-base font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-[0.98]"
                >
                  Continuar al pago
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-semibold text-crema-50">Pago seguro</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-crema-400">
                  <LockIcon className="text-caramel-500" /> Simulación — no se procesa ningún cargo real.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Titular de la tarjeta" value={pay.cardName} onChange={setP("cardName")} placeholder="MARIA F LOPEZ" error={errors.cardName} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-crema-400">Número de tarjeta</span>
                      <div className="relative">
                        <CardIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-caramel-400" />
                        <input
                          inputMode="numeric"
                          value={pay.cardNumber}
                          onChange={(e) => setP("cardNumber")(formatCard(e.target.value))}
                          placeholder="4242 4242 4242 4242"
                          className={`w-full rounded-lg border bg-espresso-850 py-2.5 pl-11 pr-3.5 font-mono text-sm tracking-wider text-crema-100 placeholder:text-crema-500 transition focus:border-caramel-500 ${
                            errors.cardNumber ? "border-ember-500" : "border-espresso-600"
                          }`}
                        />
                      </div>
                      {errors.cardNumber && <span className="mt-1 block text-xs font-semibold text-ember-400">{errors.cardNumber}</span>}
                    </label>
                  </div>
                  <Field label="Vigencia (MM/AA)" inputMode="numeric" maxLength={5} value={pay.expiry} onChange={setP("expiry")} placeholder="09/28" error={errors.expiry} />
                  <Field label="CVC" inputMode="numeric" maxLength={4} value={pay.cvc} onChange={setP("cvc")} placeholder="123" error={errors.cvc} />
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="rounded-full border border-espresso-600 px-5 py-3 text-sm font-bold text-crema-300 transition hover:border-crema-500 hover:text-crema-100 active:scale-95"
                  >
                    Volver
                  </button>
                  <button
                    onClick={payNow}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-caramel-500 py-3 font-display text-base font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-[0.98]"
                  >
                    <LockIcon className="text-lg" /> Pagar {money(total)}
                  </button>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="flex min-h-[320px] animate-fade-in flex-col items-center justify-center gap-5 text-center">
                <SpinnerIcon className="h-12 w-12 animate-spin text-caramel-400" strokeWidth={2.2} />
                <div>
                  <p className="font-display text-xl font-semibold text-crema-50">Confirmando tu pedido…</p>
                  <p className="mt-1.5 text-sm text-crema-400">
                    Hablando con el banco (de mentira) y avisándole al tostador.
                  </p>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="flex animate-fade-in flex-col items-center justify-center gap-4 py-6 text-center">
                <svg viewBox="0 0 64 64" className="h-20 w-20">
                  <circle cx="32" cy="32" r="29" fill="none" stroke="var(--color-sage-400)" strokeWidth="3" opacity="0.35" />
                  <path
                    d="M20 33.5 28.5 42 45 24"
                    fill="none"
                    stroke="var(--color-sage-300)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="48"
                    className="animate-draw-check"
                  />
                </svg>
                <div>
                  <h2 className="font-display text-3xl font-semibold text-crema-50">¡Pedido confirmado!</h2>
                  <p className="mt-2 text-sm text-crema-300">
                    Tu número de orden es{" "}
                    <span className="rounded-md bg-espresso-800 px-2 py-0.5 font-mono font-bold text-caramel-300">{code}</span>
                  </p>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-crema-400">
                  Tostaremos tu café el próximo lunes y lo enviaremos a <span className="font-semibold text-crema-200">{ship.city}</span> antes de
                  72 h. Recibirás la guía en <span className="font-semibold text-crema-200">{ship.email}</span>.
                </p>
                <div className="mt-1 rounded-full border border-espresso-600 bg-espresso-850 px-5 py-2 text-sm font-semibold text-crema-200">
                  Total pagado (simulado): <span className="text-caramel-300">{money(total)}</span>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-2 rounded-full bg-caramel-500 px-8 py-3 font-display text-base font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-95"
                >
                  Volver a la barra
                </button>
              </div>
            )}
          </div>

          {/* resumen del pedido */}
          {step !== "success" && (
            <aside className="border-t border-espresso-700/80 bg-espresso-850/60 p-6 md:border-l md:border-t-0">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-crema-400">Tu pedido</h3>
              <ul className="mt-4 space-y-3">
                {items.map((it) => (
                  <li key={it.key} className="flex items-center gap-3">
                    <img src={it.product.image} alt="" className="h-12 w-12 shrink-0 rounded-md border border-espresso-700 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-crema-100">{it.product.name}</p>
                      <p className="text-xs text-crema-500">{weightLabel(it.weight)} · {it.grind} · ×{it.qty}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-crema-200">{money(it.unitPrice * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-1.5 border-t border-espresso-700 pt-4 text-sm">
                <div className="flex justify-between text-crema-300">
                  <dt>Subtotal</dt><dd className="font-semibold text-crema-100">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-crema-300">
                  <dt>Envío</dt><dd className="font-semibold text-crema-100">{shipping === 0 ? "Gratis" : money(shipping)}</dd>
                </div>
                <div className="flex justify-between pt-1 font-display text-lg font-bold text-crema-50">
                  <dt>Total</dt><dd>{money(total)}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-lg border border-espresso-700 bg-espresso-900 px-3.5 py-2.5 text-[11px] leading-relaxed text-crema-500">
                Envío a: {ship.address ? `${ship.address}, ${ship.city}` : "pendiente de captura"}. Empaque sellado con
                válvula y fecha de tueste.
              </p>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
