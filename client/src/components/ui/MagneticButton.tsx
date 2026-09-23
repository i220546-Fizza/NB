import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({
  children,
  strength = 18,
  className = '',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: (x / rect.width) * strength, y: (y / rect.height) * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
