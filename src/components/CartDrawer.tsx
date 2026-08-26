import type { CartItem, Product } from "../types";
import { FREE_SHIPPING_FROM, SHIPPING_COST } from "../data/products";
import { money, priceForWeight, weightLabel } from "../lib/format";
import { ArrowRightIcon, BagIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, XIcon } from "./Icons";

export interface EnrichedItem extends CartItem {
  product: Product;
  unitPrice: number;
}

interface Props {
  open: boolean;
  items: EnrichedItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, items, onClose, onUpdateQty, onRemove, onCheckout }: Props) {
  if (!open) return null;

  const subtotal = items.reduce((acc, it) => acc + it.unitPrice * it.qty, 0);
  const freeShipping = subtotal >= FREE_SHIPPING_FROM;
  const shipping = items.length === 0 || freeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM);
  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <button aria-label="Cerrar carrito" onClick={onClose} className="absolute inset-0 animate-fade-in cursor-default bg-espresso-950/75 backdrop-blur-sm" />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-drawer-in flex-col border-l border-espresso-700/80 bg-espresso-900 shadow-2xl">
        <header className="flex items-center justify-between border-b border-espresso-700/80 px-6 py-5">
          <h2 className="font-display text-2xl font-semibold text-crema-50">
            Tu carrito
            {items.length > 0 && (
              <span className="ml-2 align-middle rounded-full bg-caramel-500 px-2.5 py-0.5 text-xs font-bold text-espresso-950">
                {items.reduce((a, i) => a + i.qty, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="grid h-10 w-10 place-items-center rounded-full border border-espresso-600 text-crema-300 transition hover:border-caramel-500 hover:text-caramel-300 active:scale-90"
          >
            <XIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-espresso-600 text-3xl text-crema-500">
              <BagIcon />
            </span>
            <p className="font-display text-xl text-crema-200">El carrito está vacío</p>
            <p className="text-sm text-crema-400">
              La barra tiene seis lotes esperando. Elige el tuyo antes de que se enfríe.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-caramel-500 px-6 py-2.5 text-sm font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-95"
            >
              Ver la barra
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-espresso-800 overflow-y-auto px-6 nice-scroll">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 py-5">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-20 w-20 shrink-0 rounded-lg border border-espresso-700 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold text-crema-50">{it.product.name}</p>
                        <p className="mt-0.5 text-xs text-crema-400">
                          {weightLabel(it.weight)} · {it.grind}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(it.key)}
                        aria-label={`Quitar ${it.product.name}`}
                        className="shrink-0 rounded-full p-1.5 text-crema-500 transition hover:bg-ember-500/15 hover:text-ember-400 active:scale-90"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-espresso-600">
                        <button
                          onClick={() => onUpdateQty(it.key, -1)}
                          aria-label="Disminuir cantidad"
                          className="grid h-8 w-8 place-items-center text-crema-300 transition hover:text-caramel-400 active:scale-90"
                        >
                          <MinusIcon className="text-sm" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-crema-50" aria-live="polite">{it.qty}</span>
                        <button
                          onClick={() => onUpdateQty(it.key, 1)}
                          aria-label="Aumentar cantidad"
                          className="grid h-8 w-8 place-items-center text-crema-300 transition hover:text-caramel-400 active:scale-90"
                        >
                          <PlusIcon className="text-sm" />
                        </button>
                      </div>
                      <p className="font-display text-lg font-bold text-crema-50">{money(it.unitPrice * it.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-espresso-700/80 bg-espresso-850/70 px-6 py-5">
              <div className={`mb-4 rounded-lg border px-4 py-3 ${freeShipping ? "border-sage-500/40 bg-sage-500/10" : "border-espresso-600 bg-espresso-800"}`}>
                <p className={`flex items-center gap-2 text-xs font-semibold ${freeShipping ? "text-sage-300" : "text-crema-300"}`}>
                  <TruckIcon className="text-base" />
                  {freeShipping ? "¡Envío gratis desbloqueado!" : `Te faltan ${money(missing)} para el envío gratis`}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-espresso-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${freeShipping ? "bg-sage-400" : "bg-caramel-500"}`}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-crema-300">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-crema-100">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-crema-300">
                  <dt>Envío</dt>
                  <dd className="font-semibold text-crema-100">{shipping === 0 ? "Gratis" : money(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-espresso-700 pt-2.5 font-display text-xl font-bold text-crema-50">
                  <dt>Total</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>

              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-caramel-500 py-3.5 font-display text-base font-bold text-espresso-950 transition hover:bg-caramel-400 active:scale-[0.98]"
              >
                Finalizar compra
                <ArrowRightIcon className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-2.5 text-center text-[11px] text-crema-500">
                Demo · el pago es simulado, no se realiza ningún cargo.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
