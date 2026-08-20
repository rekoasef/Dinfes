import { site } from "@/lib/data/site";

/**
 * Wordmark: a press glyph (two platens closing on a die) plus the name.
 * `compact` is used by the header when it shrinks on scroll.
 */
export default function Logo({
  compact = false,
  className = "",
  tone = "light",
}: {
  compact?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={`shrink-0 transition-all duration-300 ${compact ? "h-8 w-8" : "h-10 w-10"}`}
      >
        <rect width="40" height="40" rx="11" className="fill-accent-500" />
        {/* Ram pressing down onto a bed plate. */}
        <path
          d="M12 11.5 L20 19.5 L28 11.5"
          fill="none"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="11" y="24.5" width="18" height="4.5" rx="1.6" fill="white" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight transition-all duration-300 ${
            compact ? "text-lg" : "text-xl"
          } ${tone === "light" ? "text-white" : "text-brand-950"}`}
        >
          {site.name}
        </span>
        <span
          className={`mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
            compact ? "hidden" : "hidden sm:block"
          } ${tone === "light" ? "text-slate-400" : "text-slate-500"}`}
        >
          Máquinas hidráulicas
        </span>
      </span>
    </span>
  );
}
