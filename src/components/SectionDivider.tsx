/**
 * Diagonal edge between two section colours. Replaces the previous wave SVG,
 * which read as decorative rather than structural.
 *
 * `fillClass` is the colour of the *incoming* section, `className` carries the
 * colour of the section it sits on top of.
 */
export default function SectionDivider({
  fillClass,
  className = "",
  flip = false,
  height = "h-8 sm:h-14",
}: {
  fillClass: string;
  className?: string;
  flip?: boolean;
  height?: string;
}) {
  return (
    <div aria-hidden="true" className={`relative w-full ${height} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polygon
          points={flip ? "0,0 1440,0 1440,26 0,80" : "0,80 1440,54 1440,80"}
          className={fillClass}
        />
      </svg>
    </div>
  );
}
