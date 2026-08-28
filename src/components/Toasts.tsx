import type { ToastMsg } from "../types";
import { BeanIcon, XIcon } from "./Icons";

interface Props {
  toasts: ToastMsg[];
  onDismiss: (id: number) => void;
  onOpenCart: () => void;
}

export default function Toasts({ toasts, onDismiss, onOpenCart }: Props) {
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full animate-toast-in items-center gap-3 rounded-full border border-espresso-700 bg-crema-100 py-2.5 pl-4 pr-2.5 text-espresso-900 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)]"
        >
          <BeanIcon className="shrink-0 text-xl text-caramel-600" />
          <p className="flex-1 text-sm font-semibold leading-snug">{t.text}</p>
          {t.kind === "success" && (
            <button
              onClick={onOpenCart}
              className="shrink-0 rounded-full bg-espresso-900 px-3.5 py-1.5 text-xs font-bold text-crema-100 transition hover:bg-espresso-700 active:scale-95"
            >
              Ver carrito
            </button>
          )}
          <button
            onClick={() => onDismiss(t.id)}
            aria-label="Cerrar aviso"
            className="shrink-0 rounded-full p-1.5 text-espresso-900/60 transition hover:bg-espresso-900/10 hover:text-espresso-900"
          >
            <XIcon />
          </button>
        </div>
      ))}
    </div>
  );
}
