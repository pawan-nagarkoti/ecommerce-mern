export const StatCard = ({
  label,
  value,
  icon,
  delta,
  deltaLabel,
  accent = "indigo",
}) => {
  const accentRing =
    {
      indigo: "ring-indigo-100 bg-indigo-50 text-indigo-600",
      emerald: "ring-emerald-100 bg-emerald-50 text-emerald-600",
      amber: "ring-amber-100 bg-amber-50 text-amber-600",
      rose: "ring-rose-100 bg-rose-50 text-rose-600",
      sky: "ring-sky-100 bg-sky-50 text-sky-600",
    }[accent] || "ring-indigo-100 bg-indigo-50 text-indigo-600";

  const deltaColor = (delta ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600";
  const deltaPrefix = (delta ?? 0) >= 0 ? "▲" : "▼";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900">
            {Intl.NumberFormat().format(value ?? 0)}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accentRing}`}
        >
          {icon}
        </div>
      </div>

      {(delta !== undefined || deltaLabel) && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-xs font-medium ${deltaColor}`}>
            {deltaPrefix} {Math.abs(delta ?? 0)}%
          </span>
          {deltaLabel && (
            <span className="text-xs text-zinc-500">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};
