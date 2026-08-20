/**
 * Continuously scrolling strip of keywords. Rendered twice so the loop is
 * seamless; the duplicate is hidden from assistive tech.
 */
export default function Ticker({
  items,
  className = "",
  duration = 45,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const group = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 whitespace-nowrap pr-8 text-sm font-medium text-slate-400"
        >
          <span>{item}</span>
          <span aria-hidden="true" className="text-accent-500/70">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`mask-fade-x flex overflow-hidden ${className}`}>
      <div
        className="flex animate-[ticker_var(--ticker-duration)_linear_infinite]"
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
      >
        {group}
      </div>
      <div
        aria-hidden="true"
        className="flex animate-[ticker_var(--ticker-duration)_linear_infinite]"
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
      >
        {group}
      </div>
    </div>
  );
}
