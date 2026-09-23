/**
 * CSS-only fallback for devices without WebGL, or with reduced-motion
 * preferences. Uses the generated bottle image plus layered radial-gradient
 * "mist" and floating particles, so the experience is never an empty box.
 */
export function BottleFallback({
  image,
  alt,
  animate = true,
}: {
  image: string;
  alt: string;
  animate?: boolean;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={`absolute h-[70%] w-[70%] rounded-full bg-champagne/20 blur-3xl ${
          animate ? 'animate-drift' : ''
        }`}
      />
      <div
        className={`absolute h-[50%] w-[90%] rounded-full bg-beige/10 blur-3xl ${
          animate ? 'animate-drift' : ''
        }`}
        style={{ animationDelay: '2s' }}
      />
      {animate &&
        Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-champagne/70 animate-floatSlow"
            style={{
              left: `${20 + ((i * 37) % 60)}%`,
              top: `${15 + ((i * 53) % 70)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}
      <img
        src={image}
        alt={alt}
        className={`relative z-10 h-[85%] max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] ${
          animate ? 'animate-floatSlow' : ''
        }`}
        style={{ animationDuration: '8s' }}
      />
    </div>
  );
}
