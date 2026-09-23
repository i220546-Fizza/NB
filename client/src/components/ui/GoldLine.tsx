export function GoldLine({ className = '', vertical = false }: { className?: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <span
        className={`inline-block w-px bg-gradient-to-b from-transparent via-champagne to-transparent ${className}`}
      />
    );
  }
  return <span className={`gold-line ${className}`} />;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <GoldLine />
      <span className="label-eyebrow">{children}</span>
    </div>
  );
}
