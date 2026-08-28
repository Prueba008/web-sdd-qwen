import type { Weight } from "../types";

export const money = (n: number): string => `$${n.toFixed(2)}`;

export const roastLabel = (roast: number): string => {
  if (roast <= 1) return "Muy claro";
  if (roast === 2) return "Claro";
  if (roast === 3) return "Medio";
  if (roast === 4) return "Medio-oscuro";
  return "Oscuro";
};

export const weightLabel = (w: Weight): string => (w === 250 ? "250 g" : "1 kg");

/** 1 kg = 3.6 × 250 g, redondeado a precio comercial (terminación .90). */
export const priceForWeight = (base: number, w: Weight): number =>
  w === 250 ? base : Math.round(base * 3.6) - 0.1;

export const orderCode = (): string =>
  `OBS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
