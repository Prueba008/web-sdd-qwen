import { roastLabel } from "../lib/format";

interface Props {
  roast: number;
  showLabel?: boolean;
  className?: string;
}

export default function RoastMeter({ roast, showLabel = true, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`} title={`Tueste: ${roastLabel(roast)}`}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`inline-block h-2 w-2 rounded-full transition-colors ${
              i <= roast ? "bg-caramel-400" : "bg-espresso-600"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-crema-400">
          {roastLabel(roast)}
        </span>
      )}
    </div>
  );
}
