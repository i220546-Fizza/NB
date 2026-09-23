import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';
import { ShowcaseBottleExperience } from '@/components/3d/ShowcaseBottleExperience';

const LABELS = [
  { title: 'Bergamot & Pink Pepper', note: 'Top' },
  { title: 'Jasmine & Rose', note: 'Heart' },
  { title: 'Amber & Sandalwood', note: 'Base' },
  { title: 'A Signature Sealed in Glass', note: 'Finish' },
];

export function ScentInMotion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeLabel, setActiveLabel] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0));
      progressRef.current = pct;
      setActiveLabel(Math.min(LABELS.length - 1, Math.floor(pct * LABELS.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-obsidian" style={{ height: '260vh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-1/4 h-2 w-2 rounded-full bg-champagne animate-pulse" />
          <div className="absolute right-16 bottom-1/3 h-1.5 w-1.5 rounded-full bg-champagne/70 animate-pulse" />
        </div>

        <div className="relative z-10 mb-4 text-center">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>Scent In Motion</SectionLabel>
            </div>
          </Reveal>
          <h2 className="heading-hero mt-4 text-3xl text-ivory md:text-5xl">
            A SIGNATURE UNFOLDING
          </h2>
        </div>

        <div className="relative h-[55%] w-full max-w-2xl">
          <ShowcaseBottleExperience progressRef={progressRef} />
        </div>

        <div className="relative z-10 h-16 text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-champagne">
            {LABELS[activeLabel].note}
          </p>
          <p className="mt-1 font-serif text-lg text-beige/70">{LABELS[activeLabel].title}</p>
        </div>
      </div>
    </section>
  );
}
