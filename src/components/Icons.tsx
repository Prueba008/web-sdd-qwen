import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BeanIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5 3.5 16.7 3.5 12 7.3 3.5 12 3.5Z" />
    <path d="M12 3.5c-2.8 3.2-2.8 13.8 0 17" />
  </svg>
);

export const CupIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4 9h13v6.5A4.5 4.5 0 0 1 12.5 20h-4A4.5 4.5 0 0 1 4 15.5V9Z" />
    <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M8 5.5c0-1 .8-1 .8-2M12 5.5c0-1 .8-1 .8-2" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);

export const CartIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4.5 6.5h15M9.5 6V4.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V6" />
    <path d="M6.5 6.5 7.4 19a2 2 0 0 0 2 1.9h5.2a2 2 0 0 0 2-1.9l.9-12.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const ArrowDownIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 4v16M5.5 13.5 12 20l6.5-6.5" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.3" r="2.3" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M5 19C5 9.5 12.5 4 20 4c0 9-5 15-15 15Z" />
    <path d="M5 19c3-6 7-9.5 11-11.5" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 3.5s1 2.4 1 4.2c1.8-1 3-2.2 3-2.2s3 3.4 3 7.3A7 7 0 0 1 5 12.8C5 8 12 3.5 12 3.5Z" />
    <path d="M12 20.5a3.2 3.2 0 0 1-3.2-3.2c0-2 3.2-4.3 3.2-4.3s3.2 2.3 3.2 4.3A3.2 3.2 0 0 1 12 20.5Z" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M3 6.5h11.5v10H3zM14.5 10h3.7l2.8 3.2v3.3h-6.5" />
    <circle cx="7.2" cy="17.8" r="1.9" />
    <circle cx="17.2" cy="17.8" r="1.9" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);

export const LockIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);

export const RoasterIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
  </svg>
);

export const SpinnerIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M6 7.5h12l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.8A1.8 1.8 0 0 1 7 19.5l-1-12Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);

export const SteamIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M8 4c-1.5 2 1.5 3.5 0 5.5M12.5 3c-1.5 2 1.5 3.5 0 5.5M17 4c-1.5 2 1.5 3.5 0 5.5" />
    <path d="M5 13h14l-.9 6a2 2 0 0 1-2 1.7H7.9a2 2 0 0 1-2-1.7L5 13Z" />
  </svg>
);
