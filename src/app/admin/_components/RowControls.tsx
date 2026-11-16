import { move, togglePublished } from "../actions";
import { buttonClass } from "./ui";

/** Up/down and show/hide for one row of a list. Plain forms, so they work before JS loads. */
export default function RowControls({
  table,
  id,
  published,
  isFirst,
  isLast,
  label,
}: {
  table: "categories" | "products";
  id: string;
  published: boolean;
  isFirst: boolean;
  isLast: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <form action={togglePublished}>
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="published" value={String(published)} />
        <button
          type="submit"
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            published
              ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
          }`}
          aria-label={`${published ? "Ocultar" : "Mostrar"} ${label} en la web`}
          title={published ? "Clic para ocultar de la web" : "Clic para mostrar en la web"}
        >
          {published ? "Visible" : "Oculto"}
        </button>
      </form>
      {(["up", "down"] as const).map((direction) => (
        <form key={direction} action={move}>
          <input type="hidden" name="table" value={table} />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="direction" value={direction} />
          <button
            type="submit"
            disabled={direction === "up" ? isFirst : isLast}
            className={buttonClass.icon}
            aria-label={`Mover ${label} ${direction === "up" ? "arriba" : "abajo"}`}
          >
            {direction === "up" ? "↑" : "↓"}
          </button>
        </form>
      ))}
    </div>
  );
}
