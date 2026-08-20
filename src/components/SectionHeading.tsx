import Reveal from "./motion/Reveal";
import WordReveal from "./motion/WordReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** `dark` = dark text on light background. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-brand-950";
  const bodyColor = tone === "light" ? "text-slate-400" : "text-slate-600";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass} ${className}`}>
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 text-accent-500">
            <span aria-hidden="true" className="h-px w-6 bg-accent-500" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <WordReveal
        as="h2"
        text={title}
        className={`font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      />
      {description ? (
        <Reveal delay={0.15}>
          <p className={`text-base leading-relaxed sm:text-lg ${bodyColor}`}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
