"use client";

import { useState } from "react";
import type { ProductSpec } from "@/lib/data/catalog";
import { buttonClass, inputClass } from "./ui";

type Row = ProductSpec & { key: number };

/** Label/value rows for the spec table in the product detail view. */
export default function SpecsEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: ProductSpec[];
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    defaultValue.map((spec, index) => ({ ...spec, key: index }))
  );
  const [nextKey, setNextKey] = useState(defaultValue.length);

  const update = (key: number, patch: Partial<ProductSpec>) =>
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));

  return (
    <div className="flex flex-col gap-2">
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(rows.map(({ label, value }) => ({ label, value })))}
      />

      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">Sin datos técnicos cargados.</p>
      ) : null}

      {rows.map((row, index) => (
        <div key={row.key} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            aria-label={`Dato ${index + 1}: nombre`}
            placeholder="Ej: Capacidad"
            value={row.label}
            onChange={(event) => update(row.key, { label: event.target.value })}
            className={inputClass}
          />
          <input
            aria-label={`Dato ${index + 1}: valor`}
            placeholder="Ej: 300 Tns."
            value={row.value}
            onChange={(event) => update(row.key, { value: event.target.value })}
            className={inputClass}
          />
          <button
            type="button"
            aria-label={`Quitar dato ${index + 1}`}
            className={`${buttonClass.icon} h-auto self-stretch px-3`}
            onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
          >
            ✕
          </button>
        </div>
      ))}

      <div>
        <button
          type="button"
          className={buttonClass.secondary}
          onClick={() => {
            setRows((current) => [...current, { key: nextKey, label: "", value: "" }]);
            setNextKey((key) => key + 1);
          }}
        >
          + Agregar dato técnico
        </button>
      </div>
    </div>
  );
}
